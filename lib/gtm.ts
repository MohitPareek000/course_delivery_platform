// Google Tag Manager Data Layer utilities with Tracker class
import { getISTTimestamp } from '@/lib/dateUtils';

// GTM Event Types - Standardized event names
export const GTMEventType = {
  PAGE_VIEW: 'we_page_load',
  SECTION_VIEW: 'gtm_section_view',
  CLICK: 'gtm_custom_click',
  HOVER: 'hover',
  FORM_SUBMIT_STATUS: 'form_submit_status',
  FORM_INPUT: 'form_input',
  // Custom events for our course platform
  AUTH_EVENT: 'auth_event',
  COURSE_EVENT: 'course_event',
  CLASS_EVENT: 'class_event',
  VIDEO_EVENT: 'video_event',
  CONTEST_EVENT: 'contest_event',
};

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Utility functions
function isUndefined(v: any): boolean {
  return typeof v === 'undefined';
}

function isObject(v: any): boolean {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function deepMerge(target: any, source: any): any {
  const out = Array.isArray(target) ? { ...target } : { ...target };
  Object.keys(source || {}).forEach((key) => {
    const sVal = source[key];
    const tVal = out[key];
    if (isObject(tVal) && isObject(sVal)) {
      out[key] = deepMerge(tVal, sVal);
    } else {
      out[key] = sVal;
    }
  });
  return out;
}

function removeEmptyKeys(obj: any): any {
  if (!isObject(obj)) return obj;
  const out: any = {};
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (!isUndefined(v) && v !== null && v !== '') {
      out[k] = isObject(v) ? removeEmptyKeys(v) : v;
    }
  });
  return out;
}

// Tracker Configuration
interface TrackerConfig {
  isEnabled?: boolean;
  attributes?: Record<string, any>;
}

const DEFAULT_CONFIG: TrackerConfig = {
  isEnabled: true,
  attributes: {},
};

// Main Tracker Class
class Tracker {
  private _platform: string;
  private _isLoggedIn: boolean;
  private _isEnabled: boolean;
  private _shouldTrack: boolean;
  private _superAttributes: Record<string, any>;
  private _pendingList: Array<{ event: string; attributes: any }>;
  private _pushToPendingList: boolean;

  constructor(config: TrackerConfig = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    this._platform = 'web';
    this._isLoggedIn = false;
    this._isEnabled = Boolean(finalConfig.isEnabled);
    this._shouldTrack = true; // Always track (both dev and production)
    this._superAttributes = finalConfig.attributes || {};
    this._pendingList = [];
    this._pushToPendingList = false;
    this._initialiseDataLayer();
  }

  private _isWindowUndefined(): boolean {
    return typeof window === 'undefined';
  }

  private _initialiseDataLayer(): void {
    if (this._isWindowUndefined()) return;
    window.dataLayer = window.dataLayer || [];
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  get shouldTrack(): boolean {
    return this._shouldTrack;
  }

  get superAttributes(): Record<string, any> {
    return this._superAttributes;
  }

  set superAttributes(attributes: Record<string, any>) {
    this._superAttributes = deepMerge(this.superAttributes, attributes);
  }

  set isLoggedIn(status: boolean) {
    this._isLoggedIn = status;
  }

  set pushToPendingList(shouldPush: boolean) {
    this._pushToPendingList = shouldPush;
    if (!shouldPush) {
      this._pushPendingEvents();
    }
  }

  private _pushPendingEvents(): void {
    if (this._pendingList.length) {
      this._pendingList.forEach(({ event, attributes }) =>
        this._trackEvent(event, attributes)
      );
      this._pendingList = [];
    }
  }

  private _createEventPayload(event: string, _attributes: any): any {
    const { custom: customAttributes, ...attributes } = _attributes;
    const {
      custom: customSuperAttributes = {},
      attributes: superAttributes = {},
    } = this.superAttributes;

    // Include UTM parameters in all events
    const utmParams = this._extractUTMParams();

    return {
      event,
      attributes: {
        is_logged_in: this._isLoggedIn,
        timestamp: getISTTimestamp(),
        platform: this._platform,
        ...utmParams,
        ...superAttributes,
        ...attributes,
      },
      custom_attributes: {
        ...customSuperAttributes,
        ...(customAttributes || {}),
      },
    };
  }

  private _pushToDataLayer(payload: any): void {
    if (this._isWindowUndefined()) return;
    window.dataLayer.push({
      _clear: true,
      ...payload,
    });
  }

  private _logEvent(payload: any): void {
    console.info(
      `📊 GTM: "${payload.event}" event received with payload:`,
      payload
    );
  }

  private async _saveToDatabase(eventPayload: any): Promise<void> {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      });
    } catch (error) {
      console.error('Failed to save analytics to database:', error);
    }
  }

  private _trackEvent(event: string, _attributes: any = {}): void {
    if (!this.isEnabled) return;

    if (this._pushToPendingList) {
      this._pendingList.push({ event: String(event), attributes: _attributes });
      return;
    }

    const attributes = removeEmptyKeys(_attributes);
    const eventPayload = this._createEventPayload(String(event), attributes);

    if (this.shouldTrack) {
      this._pushToDataLayer(eventPayload);
      // Database tracking disabled to reduce Railway costs
      // Analytics available via Mixpanel and GTM/Google Analytics instead
    } else {
      this._logEvent(eventPayload);
    }
  }

  private _extractUTMParams(): Record<string, string> {
    if (this._isWindowUndefined()) return {};

    const url = new URL(window.location.href);
    const utmParams: Record<string, string> = {};

    // Extract all UTM parameters
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmKeys.forEach(key => {
      const value = url.searchParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    return utmParams;
  }

  private _createPageViewAttributes(attributes: any = {}): any {
    if (this._isWindowUndefined()) return attributes;

    const { title } = window.document;
    const url = new URL(window.location.href);
    const utmParams = this._extractUTMParams();

    return {
      page_title: title,
      page_path: url.pathname,
      page_url: url.href,
      query_params: Object.fromEntries(url.searchParams),
      // Add UTM parameters as dedicated fields
      ...utmParams,
      ...attributes,
    };
  }

  // Public API Methods
  pushRawEvent(event: any): void {
    this._pushToDataLayer(event);
  }

  click(attributes: any): void {
    this._trackEvent(GTMEventType.CLICK, attributes);
  }

  pageview(attributes: any = {}): void {
    const finalAttributes = this._createPageViewAttributes(attributes);
    this._trackEvent(GTMEventType.PAGE_VIEW, finalAttributes);
  }

  hover(attributes: any): void {
    this._trackEvent(GTMEventType.HOVER, attributes);
  }

  sectionView(attributes: any): void {
    this._trackEvent(GTMEventType.SECTION_VIEW, attributes);
  }

  formSubmitStatus(attributes: any): void {
    this._trackEvent(GTMEventType.FORM_SUBMIT_STATUS, attributes);
  }

  formInput(attributes: any): void {
    this._trackEvent(GTMEventType.FORM_INPUT, attributes);
  }

  // Authentication Events
  auth = {
    loginButtonClicked: () => {
      this.click({
        button_name: 'login_button',
        action: 'clicked',
        custom: { event_category: 'authentication' },
      });
    },
    emailEntered: (email: string) => {
      this.formInput({
        form_name: 'login_form',
        field_name: 'email',
        custom: { email, event_category: 'authentication' },
      });
    },
    otpRequested: (email: string) => {
      this._trackEvent(GTMEventType.AUTH_EVENT, {
        action: 'otp_requested',
        custom: { email, event_category: 'authentication' },
      });
    },
    otpEntered: (success: boolean) => {
      this.formInput({
        form_name: 'otp_form',
        field_name: 'otp',
        status: success ? 'success' : 'failed',
        custom: { event_category: 'authentication' },
      });
    },
    loginSuccess: (userId: string, email: string) => {
      this._isLoggedIn = true;
      this.superAttributes = {
        attributes: { user_id: userId, user_email: email },
      };
      this._trackEvent(GTMEventType.AUTH_EVENT, {
        action: 'login_success',
        custom: { user_id: userId, email, event_category: 'authentication' },
      });
    },
    loginFailed: (reason: string) => {
      this._trackEvent(GTMEventType.AUTH_EVENT, {
        action: 'login_failed',
        custom: { reason, event_category: 'authentication' },
      });
    },
    dashboardReached: () => {
      this.pageview({
        page_name: 'dashboard',
        custom: { event_category: 'navigation' },
      });
    },
    logoutClicked: () => {
      this.click({
        button_name: 'logout_button',
        action: 'clicked',
        custom: { event_category: 'authentication' },
      });
      this._isLoggedIn = false;
      this.superAttributes = { attributes: {} }; // Clear user attributes
    },
  };

  // Course Events
  course = {
    viewed: (courseId: string, courseName: string) => {
      this._trackEvent(GTMEventType.COURSE_EVENT, {
        action: 'course_viewed',
        course_id: courseId,
        course_name: courseName,
        custom: { event_category: 'course_engagement' },
      });
    },
    moduleStarted: (courseId: string, moduleId: string, moduleName: string) => {
      this._trackEvent(GTMEventType.COURSE_EVENT, {
        action: 'module_started',
        course_id: courseId,
        module_id: moduleId,
        module_name: moduleName,
        custom: { event_category: 'course_engagement' },
      });
    },
    moduleCompleted: (courseId: string, moduleId: string, moduleName: string) => {
      this._trackEvent(GTMEventType.COURSE_EVENT, {
        action: 'module_completed',
        course_id: courseId,
        module_id: moduleId,
        module_name: moduleName,
        custom: { event_category: 'course_engagement' },
      });
    },
  };

  // Class/Lesson Events
  class = {
    started: (classId: string, className: string, contentType: string, courseId: string) => {
      this._trackEvent(GTMEventType.CLASS_EVENT, {
        action: 'class_started',
        class_id: classId,
        class_name: className,
        content_type: contentType,
        course_id: courseId,
        custom: { event_category: 'learning' },
      });
    },
    videoProgress: (classId: string, className: string, progress: number, courseId: string) => {
      this._trackEvent(GTMEventType.VIDEO_EVENT, {
        action: 'video_progress',
        class_id: classId,
        class_name: className,
        progress_percent: progress,
        course_id: courseId,
        custom: { event_category: 'video_engagement', milestone: progress },
      });
    },
    completed: (
      classId: string,
      className: string,
      contentType: string,
      courseId: string,
      duration: number
    ) => {
      this._trackEvent(GTMEventType.CLASS_EVENT, {
        action: 'class_completed',
        class_id: classId,
        class_name: className,
        content_type: contentType,
        course_id: courseId,
        watch_duration: duration,
        custom: { event_category: 'learning' },
      });
    },
    textRead: (classId: string, className: string, courseId: string) => {
      this._trackEvent(GTMEventType.CLASS_EVENT, {
        action: 'text_content_read',
        class_id: classId,
        class_name: className,
        course_id: courseId,
        custom: { event_category: 'learning' },
      });
    },
  };

  // Contest Events
  contest = {
    started: (classId: string, contestName: string, courseId: string) => {
      this._trackEvent(GTMEventType.CONTEST_EVENT, {
        action: 'contest_started',
        class_id: classId,
        contest_name: contestName,
        course_id: courseId,
        custom: { event_category: 'contest' },
      });
    },
    completed: (classId: string, contestName: string, courseId: string) => {
      this._trackEvent(GTMEventType.CONTEST_EVENT, {
        action: 'contest_completed',
        class_id: classId,
        contest_name: contestName,
        course_id: courseId,
        custom: { event_category: 'contest' },
      });
    },
    externalLinkClicked: (classId: string, contestName: string, url: string) => {
      this.click({
        button_name: 'contest_external_link',
        action: 'clicked',
        class_id: classId,
        contest_name: contestName,
        destination_url: url,
        custom: { event_category: 'contest' },
      });
    },
  };

  // Button Click Events
  button = {
    clicked: (buttonName: string, page: string, properties?: Record<string, any>) => {
      this.click({
        button_name: buttonName,
        page,
        action: 'clicked',
        ...properties,
        custom: { event_category: 'ui_interaction' },
      });
    },
  };

  // Navigation Events
  navigation = {
    clicked: (destination: string, source: string) => {
      this.click({
        button_name: 'navigation_link',
        action: 'clicked',
        destination,
        source,
        custom: { event_category: 'navigation' },
      });
    },
    backClicked: (from: string) => {
      this.click({
        button_name: 'back_button',
        action: 'clicked',
        from,
        custom: { event_category: 'navigation' },
      });
    },
  };

  // Search & Filter Events
  search = {
    performed: (query: string, resultsCount: number) => {
      this._trackEvent(GTMEventType.CLICK, {
        action: 'search_performed',
        search_query: query,
        results_count: resultsCount,
        custom: { event_category: 'search' },
      });
    },
    filterApplied: (filterType: string, filterValue: string) => {
      this._trackEvent(GTMEventType.CLICK, {
        action: 'filter_applied',
        filter_type: filterType,
        filter_value: filterValue,
        custom: { event_category: 'search' },
      });
    },
  };

  // User Action Events
  user = {
    profileViewed: () => {
      this.pageview({
        page_name: 'profile',
        custom: { event_category: 'user_profile' },
      });
    },
    settingsChanged: (setting: string, value: string) => {
      this._trackEvent(GTMEventType.CLICK, {
        action: 'settings_changed',
        setting_name: setting,
        setting_value: value,
        custom: { event_category: 'user_profile' },
      });
    },
  };

  // Error Events
  error = {
    occurred: (errorType: string, errorMessage: string, page: string) => {
      this._trackEvent('error_event', {
        error_type: errorType,
        error_message: errorMessage,
        page,
        custom: { event_category: 'error' },
      });
    },
  };
}

// Create and export singleton instance
const tracker = new Tracker({
  isEnabled: true,
  attributes: {},
});

export default tracker;
export { tracker as gtm };
