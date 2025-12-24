Course Type: role-specific
Role: Software Engineer
Course Title: Data Structures and Algorithms Mastery

Course Description: Master the fundamental building blocks of computer science through comprehensive coverage of Data Structures and Algorithms. This course provides in-depth knowledge of essential data structures, algorithmic techniques, and problem-solving patterns required for software engineering excellence and technical interviews.


Module 1:
Title: Foundational Data Structures - Arrays, Strings, and Hash Tables
Description: Build a strong foundation with the most fundamental data structures including arrays, strings, and hash tables. Master array manipulation techniques, string processing patterns, and efficient key-value mapping with hash-based structures.
Order: 1
Learning Outcomes:
Master array manipulation and common patterns like Two Pointers, Sliding Window, and Prefix Sum
Understand string processing techniques and character manipulation
Implement efficient hash table operations for lookups and frequency counting
Apply these structures to solve real-world problems

Topic 1.1:
Title: Arrays - The Building Blocks
Order: 1

Class 1.1.1:
Title: Arrays Fundamentals and Characteristics
Description: Understand what arrays are, their key characteristics, and types including one-dimensional and multi-dimensional arrays.
Content Type: text
Duration: 480
Order: 1
Text Content:

# Arrays: The Building Blocks of Data Structures 

Arrays are fundamental data structures in almost all programming languages. They provide a simple yet effective way to store a fixed-size, sequential collection of elements of the same data type.

# What is an Array? 

An array is a data structure consisting of a collection of elements (values or variables), each identified by at least one array index or key.

* **Homogeneous:** All elements in an array must be of the same data type (e.g., all integers, all strings).  
* **Contiguous Memory:** Array elements are stored in adjacent or contiguous memory locations. This allows for fast, random access to any element.  
* **Fixed Size:** Once an array is created, its size is usually fixed and cannot be changed during execution.

# Key Characteristics 

| Characteristic | Description |
| :---- | :---- |
| Indexing | Elements are accessed using a zero-based index (0, 1, 2, ...). |
| Data Type | All elements must share the same data type. |
| Access Time | O(1) time complexity for accessing any element. |
| Memory | Contiguous block of memory is allocated for the entire array. |

Image URL: https://drive.google.com/file/d/10xlTFiU612CCXkg44qCW_gv45xjb4nAu/view?usp=drive_link

# Types of Arrays 

Arrays can be broadly classified based on the number of indices used to access an element.

## 1\. One-Dimensional Arrays (1D) 

A one-dimensional array is the simplest form of an array, where elements are arranged in a single row or column. You need only one index to access an element.

**Example:** A list of student scores.  
**scores** \= \[85, 92, 78, 95, 88\]

| Index | Value |
| :---- | :---- |
| 0 | 85 |
| 1 | 92 |
| 2 | 78 |
| 3 | 95 |
| 4 | 88 |

## 2\. Multi-Dimensional Arrays 

These arrays require more than one index to access an element. The most common is the two-dimensional array (2D array).

### Two-Dimensional Arrays ( 2D ) 

Often visualized as a table or a matrix, a 2D array is essentially an array of arrays. It requires two indices: one for the row and one for the column.

**Example:** A 3\*3 matrix.

| Index (Row, Col) | Col 0 | Col 1 | Col 2 |
| :---- | :---- | :---- | :---- |
| Row 0 | 10 | 11 | 12 |
| Row 1 | 20 | 21 | 22 |
| Row 2 | 30 | 31 | 32 |

Class 1.1.2:
Title: Array Patterns and Techniques
Description: Master essential algorithmic patterns for array-based problems including Two Pointers, Sliding Window, and Prefix Sum.
Content Type: text
Duration: 600
Order: 2
Text Content:

# **Array Patterns and Techniques** 

When solving array-based problems, certain algorithmic patterns are frequently used.

## 1\. Two Pointers 

This technique involves using two pointers (indices) that move through the array simultaneously, often from opposite ends (left and right) or from the same ends

* **Use Cases:** Finding pairs, in-place sorting (like quicksort partition), or reversing an array.  
* **Example Problem:** Find if a sorted array has two elements that sum up to a target value, find if pair exist whose difference \=k

## 2\. Sliding Window 

The sliding window is a conceptual sub-array (or substring) that "slides" through the main array from start to end. It's often used when dealing with problems involving a range (e.g., contiguous subarray) of a fixed or **variable size**.

* **Use Cases:** Finding the longest/shortest subarray with a specific characteristic (e.g., maximum sum sub-array of size *k*).  
* **Time Complexity:** Reduces nested loops from O(n²) to O(n).

Image URL: https://drive.google.com/file/d/1LeZA3TkHEoqkYMER3RM3rZ_K3RsCCzG1/view?usp=drive_link

## 3\. Prefix Sum 

This pattern involves pre-calculating the sum of all elements up to each index. The prefix sum array (or cumulative sum array) allows you to calculate the sum of any subarray *i* to *j* in O(1) time.

* **Calculation:** `PrefixSum[i] = A[0] + A[1] + ... + A[i]`  
  * `PrefixSum[i] = PrefixSum[i-1] + A[i]`  
* **Subarray Sum:**      `Sum(i, j) = PrefixSum[j] - PrefixSum[i-1] when i>0`  
  * `Sum(i,j) =  PrefixSum[j] when i==0`  
* **Use Cases:** Range sum queries, dynamic programming problems.




Class 1.1.3:
Title: Array Edge Cases, Pitfalls, and Operations
Description: Learn to handle edge cases, avoid common pitfalls, and understand time complexity of array operations.
Content Type: text
Duration: 420
Order: 3
Text Content:


# **Edge Cases and Pitfalls **

Mastering arrays requires careful attention to boundary conditions and common mistakes.

## Edge Cases to Consider 

| Edge Case | Description |
| :---- | :---- |
| **Empty Array** | The array has zero elements (n=0). Operations like accessing `A[0]` will crash. |
| **Single Element** | The array has only one element (n=1). Loops often need special handling. |
| **Full Array** | For fixed-size arrays, an insertion attempt when capacity is reached. |
| **All Same Values** | All elements are identical (e.g., `[5, 5, 5, 5]`). |
| **Sorted vs. Unsorted** | Assumptions about order can lead to incorrect logic (e.g., using binary search on an unsorted array). |
| **Negative Indices** | Attempting to access an index less than 0\. |

## Common Pitfalls 

* **Off-by-One Errors:** The most common array error. Confusing `A[n-1]` (the last element) with `A[n]`. Loop conditions like `i <= n` instead of `i < n`.  
* **Array Index Out of Bounds:** Attempting to access an element outside the valid range `[0, n-1]`. This often leads to runtime crashes.  
* **Shallow Copy vs. Deep Copy:** Assigning one array to another (e.g., `B = A`) in many languages creates a reference (shallow copy). Modifying `B` will also modify `A`. A *deep copy* is required to create an independent copy.  
* **Ignoring Fixed Size:** Trying to insert an element into a fixed-size array without checking for available space or implementing a resizing mechanism.

## Common Array Operations 

| Operation | Description | Time Complexity (Unsorted, Fixed Size) |
| :---- | :---- | :---- |
| Traversal | Visiting every element once. | O(n) |
| Insertion | Adding a new element in beginning (requires shifting). | O(n) |
| Deletion | Removing an element (requires shifting). | O(n) |
| Search (Linear) | Finding an element sequentially. | O(n) |
| Search (Binary) | Finding an element in a sorted array. | O(log n) |
| Updation | Modifying an element at a specific index. | O(1) |

 Class 1.1.4:
  Title: Arrays
  Description: Arrays & Techniques
  Content Type: contest
  Duration: 900
  Order: 1
  Contest URL: https://www.scaler.com/test/a/Arrays
  Contest Questions: 4
  Contest Syllabus: 
Array Basics - 1D & 2D Array
Prefix Sum & carry Forward
Sliding window & Kadanes Algo



Topic 1.2:
Title: Strings - The Art and Science
Order: 2

Class 1.2.1:
Title: String Fundamentals and Processing
Description: Master string data structures, character manipulation, and common string processing techniques.
Content Type: text
Duration: 540
Order: 1
Text Content:

# Strings: A Comprehensive Guide

Strings are a fundamental data type in nearly every programming language, serving as the universal medium for representing and manipulating text. Far from being simple sequences of characters, strings offer a rich landscape for developers to explore concepts like data encoding, pattern matching, and efficient memory management.

## What is a String?

At its core, a **string is an immutable sequence of characters**. The term "character" can vary depending on the underlying encoding system (e.g., ASCII, UTF-8), but the principle remains the same: it's a way to store human-readable text data.

## Key Characteristics

* **Sequential Data**: Characters within a string are ordered and can be accessed by their index, typically starting at 0\.  
* **Encoding**: Strings are tied to an encoding standard that maps binary values to specific characters. UTF-8 is the most common modern standard, supporting virtually all characters and symbols globally.

Here is a comparison of common encoding standards:

| Encoding Standard | Supported Character Set | Typical Use Case |
| :---- | :---- | :---- |
| ASCII | English letters, numbers, and basic symbols (128 characters) | Legacy systems, basic data |
| UTF-8 | Virtually all characters (Unicode) | Modern web, application development |
| UTF-16 | A variation of Unicode, often used internally by systems like Java and Windows | Specific platform requirements |

## What is String Immutability?

In many modern languages, including Java, C\#, and Python, strings are **immutable**.

Image URL: https://drive.google.com/file/d/1_fYm41570oyyII36f1bHSVPZieek6J__/view?usp=drive_link

Immutability means that once a string object is created, its value cannot be changed. Any operation that appears to modify a string, such as concatenation or character replacement, actually results in the creation of an entirely new string object in memory. The original string remains untouched.

## How Strings are Stored

Strings are typically stored in a dedicated memory area.

1. **Heap Memory:** The actual string data (the sequence of characters) is stored in the heap.  
2. **String Constant Pool/Interning:** To optimize memory usage, many languages maintain a "String Constant Pool" (or a similar mechanism). When a string literal (a string value written directly in code, e.g., "Hello") is encountered, the runtime first checks the pool.  
   * If the exact string already exists, a reference to the existing object is returned.  
   * If it doesn't exist, a new string object is created in the pool, and a reference is returned.

This pooling mechanism is only used for string literals and helps save memory by avoiding redundant string objects.  

Image URL: https://drive.google.com/file/d/1w9iWqm236zswjgqn9apyD4gltlFea_Wl/view?usp=drive_link

## Why Immutability Matters

1. **Thread Safety**: Because a string cannot be modified, multiple threads can safely read and access the same string object without the risk of corruption. No synchronization is needed.  
2. **Performance and Optimization**: Immutability allows the language runtime to perform optimizations like String Interning, where identical string literals are stored only once in memory, conserving space.  
3. **Security**: String values (like passwords or paths) remain constant once assigned, which is critical for security checks.

Any operation that appears to "modify" a string (such as concatenation, replacement, or trimming) actually creates a *new* string object in memory, while the original string object remains unchanged.

# Common String Pitfalls

While strings are simple to use, several common pitfalls can lead to performance issues or unexpected behavior.

## 1\. Excessive Concatenation

In languages where strings are immutable, repeatedly using the `+` operator in a loop (e.g., `s = s + "data"`) creates a new string object in memory for every iteration. This is highly inefficient.

**Solution**: Use mutable objects like **String Builders** or **String Buffers** for repeated modifications.

| Feature | Standard String (Concatenation) | String Builder |
| :---- | :---- | :---- |
| Mutability | Immutable (creates new object on every change) | Mutable (modifies the existing object) |
| Performance | Slower for repeated modifications | Faster for repeated modifications |
| Memory Use | Higher for repeated modifications | Lower for repeated modifications |

## 2\. Off-by-One Errors with Indices

Most programming languages use zero-based indexing for strings. Errors often occur when developers forget this, leading to attempts to access an index that is out of bounds (e.g., trying to access the character at `length()` instead of `length() - 1`).

**Solution**: Be vigilant when using indexing or substring functions, and always check boundary conditions.

## 3\. String Comparison

In some languages (like Java), comparing strings using the `==` operator compares the **references** (i.e., checks if they point to the exact same object in memory), not the actual character content.

To compare the actual character sequences, you must use the appropriate comparison method:

* Use `equals()` method (e.g., `s1.equals(s2)`).  
* Use `compareTo()` method.

Class 1.2.2:
Title: String Algorithms and Patterns
Description: Learn advanced string algorithms including pattern matching, substring search, and string manipulation techniques.
Content Type: text
Duration: 540
Order: 2
Text Content:

# Introduction to StringBuilder

In many programming languages, strings are often immutable. This means that once a string object is created, its value cannot be changed. Any operation that appears to modify a string (such as concatenation) actually creates a new string object in memory. While this is often efficient, frequent modifications, especially in loops, can lead to poor performance and increased memory usage due to the repeated creation and destruction of temporary string objects.

The `StringBuilder` class is designed to address th**is inefficiency by providing a mutable sequence of characters**. It is typically used when a program needs to perform a large number of string manipulations, such as appending, inserting, or replacing characters, as it modifies the string in place without creating a new object for every operation.

## Key Advantages

The primary advantage of using `StringBuilder` over standard string concatenation is performance optimization, particularly in scenarios involving:

* **Frequent Appending:** Repeatedly adding data to the end of a string.  
* **Loop-based Concatenation:** Building a long string within an iterative structure (e.g., a `for` or `while` loop).  
* **Insertion and Deletion:** Operations that modify the string at positions other than the end.

## Common Operations

The `StringBuilder` class typically provides a rich set of methods for string manipulation. Here is a summary of some of the most common operations:

| Operation | Description | Example Method  | Example (Input: sb \= "Hello") |
| :---- | :---- | :---- | :---- |
| **Append** | Adds the string representation of an object or data type to the end of the current sequence. | `append(value)` | `sb.append(" World")` results in `"Hello World"` |
| **Insert** | Inserts a string or object at a specified index position. | `insert(index,value)` | `sb.insert(5, " BIG")` results in `"Hello BIG"` |
| **Delete** | Removes characters from the sequence, often within a specified range. | `delete(startIndex, endIndex)` | `sb.delete(3, 5)` results in `"Helo"` |
| **toString** | Converts the contents of the mutable sequence back into an immutable string object. | `toString()` | `String result = sb.toString()` |

## Best Practices and Capacity

When working with `StringBuilder`, consider the following best practices:

1. **Use when modifying strings frequently:** If you are only concatenating a few strings, standard string concatenation might be simpler and is often optimized by the compiler.  
2. **Specify initial capacity:** To further improve performance, you can often provide an initial capacity for the `StringBuilder` when you create it. This reduces the number of times the underlying buffer needs to be automatically resized.

The initial capacity is the number of characters the internal buffer can hold without reallocation. If you know the approximate size of the final string, set the initial capacity accordingly:

* If the required capacity is known, set it during construction: `new StringBuilder(estimated_size)`  
* If the required capacity is unknown, the default capacity is used.

# Sample Interview Questions

Here are some sample questions to test knowledge of string concepts.

1. **Immutability**: Explain the concept of string immutability in \[Programming Language of Choice, e.g., Java/Python\]. What are the primary benefits and drawbacks of this design?  
2. **Encoding**: Describe the difference between ASCII and UTF-8. Why is UTF-8 the preferred standard for modern web development?  
3. **Performance**: When should a developer choose a String Builder over repeated string concatenation, and why?  
4. **Manipulation**: Given a string "racecar", write pseudocode to determine if it is a palindrome without using built-in reverse functions.  
5. **Longest Substring without repeating characters**  
6. **Minimum window Substring : Search the minimum window in which you have all the characters of a new string**


Topic 1.3:
Title: Hash Tables - Efficient Key-Value Mapping
Order: 3

Class 1.3.1:
Title: Hash Table Fundamentals
Description: Understand hash table components, hash functions, and collision resolution strategies.
Content Type: text
Duration: 600
Order: 1
Text Content:

# HashMap

A Hash Map, is a data structure used to implement an associative array abstract data type, **a structure that can map keys to values**. A hashmap uses a hash function to compute an index, or "slot," into an array of buckets or slots, from which the desired value can be found. It is an extremely efficient way to store and retrieve data, offering an average time complexity of O(1) for insertion, deletion, and search operations.

## Components of a HashMap

A hash table consists of three main components:

1. **The Array (or Bucket Array):** This is the underlying data structure where the values are stored. Each position in this array is often called a *bucket* or *slot*.  
2. **The Key-Value Pairs:** The data elements stored in the table, consisting of a unique key and its associated value.  
3. **The Hash Function:** A function that takes a key and converts it into an index (a number) within the bounds of the array.

Image URL: https://drive.google.com/file/d/1kE38hkA8yS_PZj7_dCchFC1IyOWkASZm/view?usp=drive_link]

## The Hash Function ⚙️

The hash function's primary role is to distribute keys uniformly across the array. A good hash function is fast to compute and minimizes collisions.

## Key Aspects of a Hash Function

* **Determinism:** The same input key must always produce the same output index.  
* **Uniformity:** It should distribute the keys as evenly as possible across the array to minimize clustering.  
* **Speed:** It must be computationally inexpensive.

# **Collision Resolution Strategies **

A *collision* occurs when the hash function generates the same index for two different keys. Since every hash table has a finite number of slots, and the number of possible keys is often infinite, collisions are inevitable.

## 1\. Separate Chaining 

Separate chaining is one of the most common methods. Instead of storing the key-value pair directly in the array slot, each slot holds a reference to a linked list (or another dynamic structure) of all the key-value pairs that hash to that same index.

* **Insertion:** Compute the index. Insert the new key-value pair at the head or tail of the linked list at that index.  
* **Search:** Compute the index. Traverse the linked list at that index, comparing keys until a match is found.

## 2\. Open Addressing (Probing) 

In open addressing, all elements are stored directly within the array. When a collision occurs, the system *probes* (searches) for the next available empty slot in the array. Common probing techniques include:

* **Linear Probing:** Searches sequentially (index \+ 1, index \+ 2, etc.) for the next empty slot.  
* **Quadratic Probing:** Searches by adding square terms (index \+ $1^2$, index \+ $2^2$, etc.) to the initial index.  
* **Double Hashing:** Uses a second hash function to determine the size of the step to take when a collision occurs.

Class 1.3.2:
Title: Hash Table Use Cases and Applications
Description: Master core use cases including frequency counting, efficient lookups, and mapping relationships.
Content Type: text
Duration: 540
Order: 2
Text Content:


# Core Use Cases and Benefits

HashMaps are the go-to structure for solving problems that require efficient tracking of frequency, existence, or mapping relationships.

## 1\. Frequency Counting and Tallying

The most common use case is tracking the frequency of elements in a collection (e.g., words, characters, numbers).

| Problem Type | HashMap Role | Example |
| :---- | :---- | :---- |
| Anagram Check | Store character counts of the first string. | Check if "listen" and "silent" have the same character counts. |
| Duplicate/Occurrence Tracking | Map element to its count. | Find the character that appears exactly once in a string. |
| Top K Frequent Elements | Store element-count pairs. | Find the three most frequently occurring words in a paragraph. |

## 2\. Efficient Lookups and Existence Checks

When you need to know if an item exists in a large collection quickly, a HashMap is superior to a list or array search (O(n)).

| Problem Type | HashMap Role | Example |
| :---- | :---- | :---- |
| Two-Sum Problem | Store previous numbers and their indices. | Given an array and a target, find two numbers that sum to the target. |
| Caching/Memoization | Store results of expensive function calls (key \= input, value \= result). | Dynamic programming or recursive solutions to avoid re-calculating results. |
| Set Simulation | Use the HashMap keys to simulate a mathematical Set. | Quickly check for unique elements in a list. |

## 3\. Mapping and Relationships

Connecting disparate pieces of information.

| Problem Type | HashMap Role | Example |
| :---- | :---- | :---- |
| Key-Value Configuration | Map a setting name to its corresponding value. | Storing user preferences (e.g., "theme" mapped to "dark"). |
| Graph/Tree Traversal | Map a node to its parent or neighbors (Adjacency List). | Building and navigating complex data relationships. |

Class 1.3.3:
Title: Hash Table Integration and Pitfalls
Description: Learn how hash tables integrate with arrays and strings, and understand common pitfalls and edge cases.
Content Type: text
Duration: 600
Order: 3
Text Content:


# HashMap Questions Integrated with Other Structures

HashMaps rarely stand alone in complex problems; they are often combined with Arrays or Strings to enhance efficiency.

## Integration with Arrays

Many array problems involving two pointers, sliding windows, or indices benefit from HashMap use.

### **Example: Finding the Longest Subarray with K Distinct Elements**

* **Structure:** An array of numbers/characters combined with a **Sliding Window** technique.  
* **HashMap Role:** The HashMap is used to track the frequency of characters *within the current window*. This allows for **O(1)** checking of the "distinct elements" count, enabling the window to expand and contract efficiently.

### **Example: Group Anagrams**

* **Structure:** An array of strings.  
* **HashMap Role:** The map groups strings that are anagrams of each other.  
  * **Key:** A canonical representation of the string (e.g., the sorted string "aet" for "eat", "tea", "ate").  
  * **Value:** A list of all strings that map to that key.

## Integration with Strings

When dealing with string manipulation, HashMaps simplify counting, uniqueness checks, and pattern matching.

### **Example: Minimum Window Substring**

* **Structure:** Two strings (a source string $S$ and a target string $T$).  
* **HashMap Role:** Two HashMaps are used:  
  1. One to store the required character counts from $T$.  
  2. One to store the current character counts in the sliding window of $S$.  
     The maps allow for O(1) comparison of the required vs. current character needs.

### **Example: First Non-Repeating Character**

* **Structure:** A single string.  
* **HashMap Role:** Map each character to its frequency. A single pass to populate the map, followed by a second pass over the string to find the first character with a count of 1\.  
* 

# Common Pitfalls and Edge Cases

While HashMaps are powerful, they are not immune to issues. Understanding the pitfalls is crucial for writing robust and efficient code.

## 1\. Handling Null/Empty Keys or Values

* **Pitfall:** Different languages/implementations handle `null` keys differently (some allow one, some none).  
* **Edge Case:** Always clarify whether keys or values in the input data can be null or empty. If the input allows them, ensure your logic correctly handles the special case (e.g., using a non-null placeholder key if needed, or explicitly checking for `null` during retrieval).

## 2\. Collision Handling (Performance Degradation)

* **Pitfall:** HashMaps offer O(1) average time complexity, but in the worst case (many collisions or a poor hash function), this degrades to **O(n)**.  
* **Edge Case:** If the problem involves custom objects as keys, the `hashCode()` and `equals()` methods *must* be correctly implemented. A poorly implemented `hashCode()` will lead to excessive collisions.

## 3\. Key Type Mismatch and Mutability

* **Pitfall:** Using a **mutable** object (like an array or list) as a key.  
* **Edge Case:** If a mutable key is placed into the map, and its contents are changed *after* insertion, the map will be unable to retrieve the value associated with the key because the key's hash code has changed. **Always use immutable objects (like Strings, Integers, or custom immutable classes) as keys.**

## 4\. Insertion Order vs. Retrieval Order

* **Pitfall:** Assuming the order of iteration over the map matches the order of insertion.  
* **Edge Case:** Standard HashMaps (like Java's `HashMap` or Python's `dict` before Python 3.7) do **not** guarantee insertion order. If order is essential (e.g., for temporal problems), you must use an ordered map structure like a `LinkedHashMap` or `OrderedDict`.

## 5\. Memory Overhead

* **Pitfall:** HashMaps generally require more memory than simple arrays or lists because they store both the key and the value, and often have internal overhead (like capacity reserved for resizing).  
* **Edge Case:** When memory is severely constrained, or the keys are simply sequential integers (0, 1, 2...), a simple array may be a more memory-efficient solution than a HashMap.

# Application of Hash Tables

Hash tables are fundamental in computer science and underpin many high-performance systems.

* **Databases:** Used for indexing data to speed up lookup operations.  
* **Caches:** Employed to quickly store and retrieve recently accessed data.  
* **Symbol Tables (in compilers):** Used to store information about identifiers (variables, functions, etc.) for fast lookup during compilation.  
* **Programming Language Dictionaries/Maps:** The built-in dictionary/map/object types in languages like Python (`dict`), Java (`HashMap`), and JavaScript (`Object`/`Map`) are typically implemented using hash tables.

Comparison of Map Implementations

In many programming languages, particularly Java, the `Map` interface is implemented by several classes, each with distinct characteristics regarding order, synchronization, and performance.**The Map Interface (Java Context)**

A **Map** represents a collection of key-value pairs. It cannot contain duplicate keys, and each key can map to at most one value.

| Feature | HashMap | LinkedHashMap | TreeMap |
| ----- | ----- | ----- | ----- |
| **Ordering** | No guaranteed order. Order can change over time. | Maintains insertion order (the order in which keys were first inserted). | Sorted by key (using their natural order or a custom `Comparator`). |
| **Null Keys/Values** | Accepts one `null` key and multiple `null` values. | Accepts one `null` key and multiple `null` values. | Does **not** accept `null` keys (will throw `NullPointerException`), but accepts `null` values. |
| **Implementation** | Hash Table (uses the `hashCode()` and `equals()` methods). | Hash Table with a doubly-linked list running through its entries. | Red-Black Tree (a self-balancing Binary Search Tree). |
| **Performance** | O(1) average time complexity for basic operations (`get`, `put`, `remove`). | O(1) average time complexity for basic operations. Iteration is faster than `HashMap` for a large map as it follows the insertion order. | O(log n) time complexity for basic operations. |
| **Synchronization** | Not synchronized (better performance in single-threaded environments). | Not synchronized. | Not synchronized. |
| **Use Case** | Best for high-speed lookups where the order of elements does not matter. | Best when you need predictable iteration order, such as building caches where you might need to implement a Least Recently Used (LRU) policy. | Best when you need the keys to be maintained in a sorted order. |

Class 1.3.4:
  Title: Hashmap
  Description: HashMap 
  Content Type: contest
  Duration: 900
  Order: 1
  Contest URL: https://www.scaler.com/test/a/Hashmap
  Contest Questions: 4
  Contest Syllabus: 
Hashmap basics
String & Array techniques 



Module 2:
Title: Sorting and Searching Algorithms
Description: Master fundamental algorithms for sorting and searching data efficiently. Learn various sorting algorithms, understand their trade-offs, and master binary search patterns for both sorted arrays and answer spaces.
Order: 2
Learning Outcomes:
Understand time and space complexity of sorting algorithms
Master binary search on sorted arrays and answer spaces
Apply appropriate algorithms for different problem constraints
Optimize search operations using divide-and-conquer techniques

Topic 2.1:
Title: Sorting Algorithms
Order: 1

Class 2.1.1:
Title: Introduction to Sorting and Simple Sorting Algorithms
Description: Understand the importance of sorting and master simple sorting algorithms including Bubble Sort, Selection Sort, and Insertion Sort.
Content Type: text
Duration: 600
Order: 1
Text Content:


# The Power of Order: Sorting Algorithms and Applications

# Introduction to Sorting

Sorting is a fundamental computational problem that involves arranging elements of a list in a certain order. The goal of sorting is to make data retrieval and processing more efficient. A well-sorted dataset is essential for various algorithms, including searching and merging.

# Core Sorting Algorithms

Sorting algorithms are generally classified based on their approach, efficiency, and stability (whether they maintain the relative order of equal elements).

Below is a comparison of key sorting algorithms, highlighting their performance and suitability:

| Algorithm | Avg Time Complexity | Worst-Case Time Complexity | Stability | Use Case |
| :---- | :---- | :---- | :---- | :---- |
| Merge Sort | O(nlog n) | O(nlog n) | **Stable** | Excellent for large, external datasets and guaranteed performance. |
| Quick Sort | O(nlog n) | O(n^2) | Unstable | Fastest in practice on average; preferred for in-memory sorting. |
| Heap Sort | O(nlog n) | O(nlog n) | Unstable | Guarantees worst-case O(nlog n) with minimal extra space (in-place). |
| Insertion Sort | O(n^2) | O(n^2) | Stable | Efficient for small datasets or nearly sorted data. |
| Bubble Sort | O(n^2) | O(n^2) | Stable | Mainly used for educational purposes; highly inefficient. |
| Selection Sort | O(n^2) | O(n^2) | Unstable | Simple to implement; performs fewer swaps than other O(n^2) sorts. |


Class 2.1.2:
Title: Custom Sorting
Description: Understand when to use custom sorting with sample codes.
Content Type: text
Duration: 660
Order: 2
Text Content:

# Custom Sorting: Defining Your Own Order

While standard sorting functions use default comparisons (numerical, alphabetical), **Custom Sorting** allows a programmer to define a specific, non-standard order for complex data types. This is usually implemented by providing a custom *Comparator* or *Key Function* to the sorting routine.

Image URL:  https://drive.google.com/file/d/1tPYb_e5p4_lIArMfsyBskP8LIj53gHC3/view?usp=drive_link

## When Custom Sorting is Essential

Custom sorting is necessary when:

* **Objects are Involved**: You need to sort a collection of custom objects (e.g., a list of `Products`) based on an internal property (e.g., `price`, `dateAdded`) rather than the object's memory address or a default string representation.  
* **Multiple Criteria are Required**: Data must be sorted by a primary field, and then by a secondary field to resolve ties (e.g., sort employees first by department (primary), and then by salary (secondary) within each department).  
* **Non-standard Logic is Applied**: The desired order is not simple ascending or descending (e.g., sorting a list of coordinates by their distance from a specific point, or sorting strings by length).

## Sample Codes for Custom Sorting (Java Example)

The following examples demonstrate how to implement a custom `Comparator` to sort a list of `Product` objects by price.

### 1\. Implementing **Comparator** using a Separate Class

```java
// Product Class

class Product {
    String name;
    double price;
    // Constructor and getters...
}

// Separate Comparator Class
class PriceComparator implements Comparator<Product> {
    @Override
    public int compare(Product p1, Product p2) { //ascending order
        if(p1.price<p2.price) return -1;
        else if(p1.price>p2.price) return 1;
        else return 0;
    }
}
// Usage

List<Product> products = ...;
Collections.sort(products, new PriceComparator());
```

### 2\. Implementing Comparator using an Anonymous Class

```java
// Usage with Anonymous Class

List<Product> products = ...;

Collections.sort(products, new Comparator<Product>() {
    @Override
    public int compare(Product p1, Product p2) { //ascending order
        if(p1.price<p2.price) return -1;
        else if(p1.price>p2.price) return 1;
        else return 0;
    }
});
```

### 3\. Implementing Comparator using a Lambda Function (Java 8+)

```java
// Usage with Lambda Function

List<Product> products = ...;

Collections.sort(products, (p1, p2) -> p1.price - p2.price );

// Alternative for cleaner code (using Comparator.comparingDouble)

Collections.sort(products, Comparator.comparingDouble(p -> p.price));
```

# Identifying Patterns: When to Use Sorting

Sorting is not a universal solution, but it is indispensable when the problem's solution relies on ordered data. Here are common patterns and scenarios where sorting can help:

## 1\. The Need for Efficient Searching

* **Pattern:** You need to quickly determine if an element exists in a large dataset, or find a specific element.  
* **Sorting Solution:** Sorting the data enables the use of **Binary Search**, which reduces the time complexity from O(n) (Sequential Search) to O(log n).

## 2\. Finding Extrema, Median, or Percentiles

* **Pattern:** You need to find the smallest, largest, or middle elements.  
* **Sorting Solution:** After sorting, the minimum is the first element, the maximum is the last, and the median/percentiles can be found by direct index access.

## 3\. Processing Data Based on Proximity

* **Pattern:** The solution involves comparing or grouping elements that are close to each other in value (e.g., finding duplicates, consolidating similar data points).  
* **Sorting Solution:** Sorting brings identical or similar elements adjacent to one another, making it easy to iterate through and identify groups or duplicates in a single pass.

## 4\. Greedy Algorithms

* **Pattern:** The problem can be solved by making a locally optimal choice at each stage (often involves selecting the smallest/largest available resource or task).  
* **Sorting Solution:** Sorting the elements (e.g., tasks by their deadline, items by their value-to-weight ratio) ensures that the "best" available choice is always at the start of the list.

Class 2.1.3:
  Title: Sorting
  Description: Sorting techniques
  Content Type: contest
  Duration: 900
  Order: 2
  Contest URL: https://www.scaler.com/test/a/Sorting
  Contest Questions: 4
  Contest Syllabus: 
Sorting Algorithms
Custom sorting

Topic 2.2:
Title: Binary Search Algorithm
Order: 2

Class 2.2.1:
Title: Binary Search Fundamentals
Description: Master the core concept of binary search, understand prerequisites, and learn the step-by-step algorithm.
Content Type: text
Duration: 540
Order: 1
Text Content:

# Binary Search Algorithm:

Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half. This process makes it significantly faster than a linear search, especially for large datasets.

# The Core Concept

Imagine trying to find a specific page in a very long book. You wouldn't start at page 1 and flip one page at a time (linear search). Instead, you'd open the book roughly in the middle, check the page number, and then decide which half of the remaining pages to search next. This is the essence of binary search.

The algorithm relies on the principle of "Divide and Conquer."

## Prerequisites

For binary search to work, the data structure must be sorted.

| Characteristic | Requirement | Example (Sorted Array) |
| :---- | :---- | :---- |
| Order | Sorted (Ascending or Descending) | \[2, 5, 8, 12, 16, 23, 38, 56, 72, 91\] |
| Data Type | Any comparable type (numbers, strings, etc.) | Numerical or Alphabetical |

# How Binary Search Works

The search process involves three main pointers and an iterative loop:

1. Start: The index of the first element in the search interval.  
2. End: The index of the last element in the search interval.  
3. Mid: The index calculated as the average of Start and End (integer division).

The steps are repeated until the item is found or the search interval is empty:

# Step-by-Step Flow

1. Initial Setup: Define the search range: Start \= 0, End \= length of list \- 1\.  
2. Calculate Mid: Calculate the middle index: Mid \= (Start \+ End) / 2 (integer division).  
3. Compare: Compare the search key (target value) with the value at the Mid index.  
   * Case 1 (Match Found): If the key equals the value at Mid, the search is successful.  
   * Case 2 (Key is Smaller): If the key is less than the value at Mid, the target must be in the left half. Set End \= Mid \- 1\.  
   * Case 3 (Key is Larger): If the key is greater than the value at Mid, the target must be in the right half. Set Start \= Mid \+ 1\.  
4. Repeat: Go back to Step 2 with the new, reduced search range.  
5. Termination: If Start becomes greater than End, the search interval is exhausted, and the key is not in the list.


# Time Complexity

Binary search is highly efficient, which is quantified by its time complexity.

| Complexity Type | Big O Notation | Description |
| :---- | :---- | :---- |
| Worst-Case | O(log n) | The maximum time taken; occurs when the element is not present or found at the last step. |
| Average-Case | O(log n) | The average time taken across all possible inputs. |
| Best-Case | O(1) | Occurs when the element is found in the very first comparison (i.e., at the middle index). |

This logarithmic (log n) growth means that doubling the size of the list only adds one extra comparison step. This is a significant advantage over linear search (O(n)).

Class 2.2.2:
Title: Advanced Binary Search Patterns
Description: Learn binary search on rotated arrays and binary search on answer spaces for min/max problems.
Content Type: text
Duration: 600
Order: 3
Text Content:


# Advanced Binary Search Patterns

While the fundamental use of binary search is on sorted arrays, its principles extend to solving a diverse range of problems, often referred to as "search space reduction."

# 1\. Binary Search on a Sorted Array (Standard)

This is the classic implementation, focusing on finding an exact target or its insertion point.

**Concept:** Continuously narrow the search interval (`[Start, End]`) based on the comparison with the middle element.

```java
function binarySearch(arr, target):

    start = 0
    end = len(arr) - 1
    while start <= end:
        mid = start + (end - start) / 2  // Prevents integer overflow
        if arr[mid] == target:
            return mid
        elseif arr[mid] < target:
            start = mid + 1
        else:
            end = mid - 1

    return -1 // Target not found
```

# 2\. Binary Search on an Unsorted Array 

Binary search *requires* a sorted space. When used on an unsorted array, it means the array has an underlying structure that *can be thought of* as sorted, like a **Rotated Sorted Array** or an array where you search for the **Peak Element**.

**Concept:** The key is to determine which half of the array remains sorted, and then check if the target falls within that sorted half.

**Example: Search in Rotated Sorted Array**

```java
function searchInRotatedArray(arr, target):

    start = 0
    end = len(arr) - 1
    while start <= end:
        mid = start + (end - start) // 2
        if arr[mid] == target:
            return mid
        // Check if the left half is sorted

        if arr[start] <= arr[mid]:
            // Check if target is in the sorted left half
            if arr[start] <= target and target < arr[mid]:
                end = mid - 1 // Search left
            else:
                start = mid + 1 // Search right
          // The right half must be sorted

        Else:


            // Check if target is in the sorted right half

            if arr[mid] < target and target <= arr[end]:
                start = mid + 1 // Search right
            else:
                end = mid - 1 // Search left


    return -1
```

# 3\. Binary Search on Answers (Min/Max Problems)

This is the most abstract and powerful pattern. Instead of searching for an index in an array, you search for the minimum or maximum possible *value* that satisfies a certain condition.

**Concept:** **The "search space" is the range of possible answers for the problem** (e.g., minimum time, maximum capacity, shortest distance). The `check` function determines if a candidate answer is feasible. If it's feasible, we try for a "better" (smaller/larger) answer.

**Example: Find the smallest possible value X such that a condition is met.**

```java
function binarySearchOnAnswers(search_space_start, search_space_end):

    low = search_space_start
    high = search_space_end
    result = high // Initialize result to a safe upper bound

    while low <= high:
        mid = low + (high - low) // 2
        // 'isFeasible' is the custom logic check for the problem
        if isFeasible(mid):
            result = mid  // Found a feasible answer, try for a smaller one
            high = mid - 1
        else:
            low = mid + 1 // Answer is too small, need a larger one
    return result
```

**Note:** The effectiveness of "Binary Search on Answers" depends entirely on the `isFeasible()` function, which must exhibit a monotonic property (e.g., if a solution of X works, then X+1 must also work).


Class 2.2.3:
  Title: Searching
  Description: Binary Search Algorithm
  Content Type: contest
  Duration: 900
  Order: 2
  Contest URL: https://www.scaler.com/test/a/Searching
  Contest Questions: 4
  Contest Syllabus: 
Searching in Arrays
Binary Search on Answers


Module 3:
Title: Linear Data Structures - Linked Lists, Stacks, and Queues
Description: Master linear data structures that organize data sequentially. Learn linked list manipulation, stack operations using LIFO principle, and queue operations using FIFO principle.
Order: 3
Learning Outcomes:
Implement and manipulate singly and doubly linked lists
Master linked list patterns including reversal and cycle detection
Understand LIFO principle and stack applications
Implement queue operations and understand FIFO principle

Topic 3.1:
Title: Linked Lists
Order: 1

Class 3.1.1:
Title: Linked List Fundamentals, types and Classic Patterns
Description: Understand linked list structure, node representation, and different types of linked lists.
Content Type: text
Duration: 540
Order: 1
Text Content:

# Linked Lists

# Introduction to Linked Lists

A Linked List is a dynamic, linear data structure where elements are not stored at contiguous memory locations. Instead, elements, known as **Nodes**, are linked together using pointers or references. This structure allows for efficient insertion and deletion of elements compared to static arrays.

## The Node Structure

Every node is composed of two primary fields:

* **Data:** The value or information the node holds.  
* **Next Pointer (or Link):** A reference to the next node in the sequence.

The list is managed by a **Head** pointer, which points to the first node. The **Tail** node's pointer typically points to `NULL`, signifying the end of the list.

# Key Types of Linked Lists

Understanding the different types of linked lists is crucial for choosing the right one for a specific problem.

1. Singly Linked List

Image URL:  https://drive.google.com/file/d/1ulxlUb8fi_QEJ9iHupsP2eMcNOgQANQD/view?usp=drive_link

## 2\. Doubly Linked List

A Doubly Linked List (DLL) is more versatile, as each node contains two pointers: one to the *next* node and one to the *previous* node. This allows for bi-directional traversal (forward and backward).

Image URL:  https://drive.google.com/file/d/13wM0Rn4N2iVWJrAIdadARcU_vrVvrQSC/view?usp=drive_link

## 3\. Circular Linked List

In a Circular Linked List (CLL), the next pointer of the last node points back to the Head node, forming a closed loop. Traversal can continue infinitely unless a break condition is specified.

Image URL:  https://drive.google.com/file/d/1JbQMcXujTn4zjzAwlAiM0KjUn_ZiVJMt/view?usp=drive_link

# Common Linked List Problem Patterns

| Pattern | Description | Example Problem |
| :---- | :---- | :---- |
| **Two-Pointer Approach (Fast & Slow)** | Using two pointers that move at different speeds (e.g., 1x and 2x) to find the middle element, detect cycles, or find the start of a cycle. | Finding the middle of a Linked List; Detecting a cycle (Floyd's Tortoise and Hare algorithm). |
| **Reversal** | Changing the direction of pointers to reverse a segment of or the entire linked list. This often involves tracking three pointers: `previous`, `current`, and `next`. | Reversing a Linked List; Reversing a sub-list between two positions. |
| **Dummy Node** | Using a temporary, non-data-holding node at the beginning of the list to simplify edge cases, particularly those involving modifications to the Head node (like deletion). | Removing Nth node from the end of a Linked List; Merging two sorted lists. |
| **Recursion** | Solving list problems by defining the solution for the current node based on the solution for the rest of the list (i.e., the next node). | Reversing a Linked List recursively; Printing the list in reverse order. |


Class 3.1.2:
Title: Linked List Pitfalls and Problem Types
Description: Learn common pitfalls, edge cases, and practice problem categories for linked lists.
Content Type: text
Duration: 480
Order: 3
Text Content:


# Common Pitfalls

## Memory and Pointer Management

* **Forgetting to update all pointers:** In a Doubly Linked List, remember to update both the `next` and `previous` pointers during insertion or deletion.  
* **Losing the Head pointer:** If you modify the Head of the list (e.g., during insertion at the beginning), ensure you update the Head pointer reference, or the rest of the list will be unreachable.  
* **Memory Leaks:** In languages requiring manual memory management, failing to `free` or `delete` nodes that are removed from the list leads to memory leaks.

## Edge Cases

* **Empty List (`Head == NULL`):** Always check if the list is empty before attempting to access the head node's data or next pointer.  
* **Single-Node List:** Operations (like deletion) may behave differently when only one node exists.  
* **Operation at the Tail:** Special care is needed when inserting at or deleting the last node, as the pointer to `NULL` must be correctly managed.  
* **Loop Termination:** In recursive or iterative solutions, ensure the loop or base case (`current != NULL` or `current.next != NULL`) is correct to prevent an infinite loop or accessing an invalid memory location.

# Essential Linked List Problems

These problems test the fundamental ability to manipulate pointers and manage edge cases.

## **1\. Reverse a Linked List**

Goal: Reverse the direction of all pointers in the list, effectively making the tail the new head and vice versa.

* **Technique:** Iterative approach using three pointers: `prev` (starts null), `current` (starts at head), and `next_node` (to save the link before moving `current`).

## **2\. Finding the Middle of a Linked List**

Goal: Find the middle node of the list. If the list has an even number of nodes, return the second of the two middle nodes.

* **Technique:** The **Tortoise and Hare** (Slow and Fast pointer) approach. The slow pointer moves one step at a time, and the fast pointer moves two steps at a time. When the fast pointer reaches the end, the slow pointer will be in the middle.

## **3\. Detect a Cycle in a Linked List**

Goal: Determine if the list contains a cycle (where a node's pointer eventually points back to a previously visited node).

* **Technique:** The **Tortoise and Hare** approach. If a cycle exists, the fast pointer will eventually catch and meet the slow pointer. If the fast pointer reaches `null` (or `null.next`), the list is linear.


Class 3.1.3:
  Title: LinkedList
  Description: SIngly & Doubly Linkedlist
  Content Type: contest
  Duration: 900
  Order: 3
  Contest URL: https://www.scaler.com/test/a/LinkedList
  Contest Questions: 4
  Contest Syllabus: 
Reverse of LinkedList
Mid of LinkedList
Cycle in Linkedlist
LRU Cache


Topic 3.2:
Title: Stacks - LIFO Data Structure
Order: 2

Class 3.2.1:
Title: Stack Fundamentals and Operations
Description: Understand LIFO principle, stack operations, and implementation approaches.
Content Type: text
Duration: 540
Order: 1
Text Content:

# Stack: A LIFO Data Structure 

A stack is a fundamental Linear Data Structure that strictly adheres to the **LIFO (Last-In, First-Out)** principle. Imagine a stack of physical objects—the last object placed on top is always the first one you can remove. This simple yet powerful mechanism is essential in many computing tasks.  

Image URL:  https://drive.google.com/file/d/1I9ddIwTF-NcjPjiRNlxNBMRf6JY2xeUz/view?usp=drive_link


# Core Principles and Operations

The main purpose of a stack is to manage data in a sequential, restrictive manner. All primary operations are performed at one end, traditionally called the **Top** of the stack, ensuring O(1) time complexity for access, insertion, and deletion.

## Key Stack Operations

| Operation | Time Complexity | Description |
| :---- | :---- | :---- |
| **Push** | O(1) | Adds a new item to the top of the stack. |
| **Pop** | O(1) | Removes the item from the top of the stack and returns it. |
| **Peek/Top** | O(1) | Returns the item at the top *without* removing it. |
| **isEmpty** | O(1) | Checks if the stack contains any elements. |
| **isFull** | O(1) | Checks if the stack has reached its maximum capacity (array-based). |

# Implementation Choices

Stacks can be implemented using different underlying structures, each with its own trade-offs:

## 1\. Array-Based Implementation

This method uses a fixed-size array to store elements.

* **Pros:** Simple, memory efficient due to contiguous storage, and better **spatial locality**.  
* **Cons:** **Fixed capacity**, leading to potential **Stack Overflow** errors if the size limit is exceeded.

## 2\. Linked List Implementation

This method uses a linked list, where each element (node) points to the next.

* **Pros:** **Dynamic size** (grows and shrinks automatically), virtually eliminating the risk of stack overflow (limited only by system memory).  
* **Cons:** Requires slightly more memory per element to store pointers/references, resulting in a small **memory overhead**.

# Essential Applications in Computing

Stacks are ubiquitous in computing due to their LIFO nature:

* **Function Call Management (The Call Stack):** The operating system uses a stack to manage the sequence of function calls. A **Stack Frame** is pushed when a function is called and popped when it returns.  
* **Undo/Redo Functionality:** Software like word processors and graphic editors use a stack to store the history of user actions, enabling quick reversal.  
* **Web Browser History:** The "Back" button functionality is typically managed by a stack of visited URLs.  
* **Expression Evaluation:** Essential for converting and evaluating arithmetic expressions (Infix, Prefix, Postfix notation).  
* **Backtracking:** Used in algorithms like Depth First Search (DFS) to keep track of the path, allowing the algorithm to "undo" steps and explore new branches.

Class 3.2.2:
Title: Stack Pitfalls and Problem Solving
Description: Learn common pitfalls, edge cases, and practice solving stack-based problems.
Content Type: text
Duration: 480
Order: 3
Text Content:


# Common pitfalls

When working with stacks, especially in professional environments, handling edge cases is crucial to prevent runtime errors:

| Pitfall | Description | Best Practice |
| :---- | :---- | :---- |
| **Stack Underflow** | Attempting to Pop or Peek an element from an empty stack. | **Always** check `isEmpty()` before calling `Pop()` or `Peek()`. |
| **Stack Overflow** | Pushing an element onto a full fixed-size (array-based) stack. | Use a **Linked List** for dynamic size, or implement robust **exception handling** and resizing for array-based stacks. |
| **No Error Checking** | Not wrapping stack operations in conditional checks or `try-catch` blocks. | Ensure every critical operation handles the edge cases of Full and Empty. |

Image URL:  https://drive.google.com/file/d/1_MwiYVUXKlXIMPkg7f4gXVdYYylDzW87/view?usp=drive_link

# Advanced Stack Patterns (Interview Focus)

The stack data structure is frequently tested in technical interviews, often requiring creative application beyond simple Push/Pop operations.

## Pattern 1: Sequence Validation

Stacks are perfectly suited for checking if sequences are balanced or valid, such as ensuring every opening symbol has a corresponding closing symbol.

* **Example:** Checking for **Valid Parentheses** in a string `"{[()]}"`.

## Pattern 2: Monotonic Stacks

A Monotonic Stack maintains a strict order (either strictly increasing or strictly decreasing) among its elements. This pattern allows for efficient O(N) solutions to problems that would otherwise require O(N²) nested loops.

* **Goal:** Efficiently find the next greater or smaller element in an array.  
* **Example:** Finding the **Largest Rectangular Area in a Histogram**.

## Pattern 3: Recursion Simulation and Backtracking

Since recursion relies on the implicit Call Stack, any recursive algorithm can be implemented iteratively using an explicit stack.

* **Example:** Implementing an **Iterative Depth First Search (DFS)** traversal on a graph or simplifying file paths.

# List of Common Stack Interview Questions

| No. | Question Title | Core Concept(s) |
| :---- | :---- | :---- |
| 1 | **Valid Parentheses/Bracket Matching** | LIFO, Pairing, Error Checking |
| 2 | **Implement Queue using Stacks** | Two-Stack Technique, Data Structure Emulation (FIFO with LIFO) |
| 3 | **Min Stack / Get Minimum Element in O(1)** | O(1) Complexity, Auxiliary Data Structures, Dual Stack Implementation |
| 4 | **Evaluate Reverse Polish Notation (RPN)** | Postfix Evaluation, Storing Operands, LIFO Arithmetic |
| 5 | **Next Greater Element** | Monotonic Stack, Single Pass Efficiency, Storing Indices/Values |


Topic 3.3:
Title: Queues - FIFO Data Structure
Order: 3

Class 3.3.1:
Title: Queue Fundamentals and Types
Description: Understand FIFO principle, queue operations, and different types of queues.
Content Type: text
Duration: 540
Order: 1
Text Content:

# The Queue Data Structure

# Introduction to Queues

The Queue is a fundamental, linear data structure in computer science that operates on the **First-In, First-Out (FIFO)** principle. This behavior mirrors a real-world line of people or objects: the first element to be inserted into the queue is always the first one to be removed.

This principle is crucial for managing and processing data in a strict chronological order, making queues indispensable for various systems.

# Key Operations

Queues primarily support a core set of operations:

| Operation | Description | Time Complexity (Linked List) |
| :---- | :---- | :---- |
| **Enqueue** | Adds a new element to the rear (or back) of the queue. | O(1) |
| **Dequeue** | Removes and returns the element from the front of the queue. | O(1) |
| **Peek/Front** | Retrieves the element at the front without removing it. | O(1) |
| **IsEmpty** | Checks if the queue currently contains any elements. | O(1) |

# Implementation Methods

The choice of implementation impacts the efficiency of the queue's operations.

## Linked List Implementation

Using a Doubly Linked List is generally considered the most efficient and robust implementation. By maintaining pointers to both the **front (head)** and the **rear (tail)**, both Enqueue (adding to the tail) and Dequeue (removing from the head) can be performed in **O(1) constant time**.

## Circular Array Implementation

While a simple array suffers from inefficient Dequeue operations (O(n) for shifting elements), the **Circular Queue** design reuses array space. It wraps around the end of the array to the beginning, providing an efficient fixed-size queue with **O(1)** Enqueue and Dequeue complexity.

# Common Applications

Queues are integral to solving many problems in computer science and real-world systems:

**1\. Breadth-First Search (BFS):** Used in graph traversal to explore all neighboring nodes at the current level before moving to the next depth.  

Image URL:  https://drive.google.com/file/d/1IWAUlu0VW88AuftS2rdeXZiJhl-lfAAb/view?usp=drive_link

**Queue's Role:** The queue is used to store the nodes that are to be visited. When a node is visited, all its unvisited neighbors are enqueued. This ensures that nodes are explored in order of their distance from the starting node.

2\. Printer/Task Spooling  
In operating systems, queues are used to manage the order in which tasks (like print jobs, I/O requests) are processed.

| Job Type | Description | Queue Example |
| :---- | :---- | :---- |
| Print Jobs | Documents sent to the printer are placed in a print queue and processed on a First-In, First-Out (FIFO) basis. | Managing a queue of documents for a networked printer at Place. |
| CPU Scheduling | Ready processes waiting for CPU time are held in a Ready Queue. | Round-robin scheduling using a queue with a time slice. |

## 3\. Simulation of Real-World Scenarios

Queues are essential in modeling and simulation, particularly in areas like traffic flow, customer service lines, and network packets.

* **Traffic Simulation:** Cars waiting at a traffic light are often modeled as a queue.  
* **Call Centers:** Incoming calls are placed in a queue until a service agent is available. The average wait time and service time are key metrics derived from this queue model.

## 4\. Message Queuing Systems

In distributed computing, message queues allow different parts of an application (or different applications) to communicate asynchronously. This improves scalability and resilience.

**Examples:** RabbitMQ, Apache Kafka, Amazon SQS

* Producers send messages to the queue.  
* Consumers retrieve messages from the queue for processing.

## 5\. Disk Scheduling Algorithms

Operating systems use queues to manage the order in which disk I/O requests are serviced to minimize seek time. Algorithms like FCFS (First-Come, First-Served) use a basic queue structure.

Image URL: https://drive.google.com/file/d/1FgJliq6Z6uVarBSvDHKKjNK4u-HT3Ene/view?usp=drive_link

Class 3.3.2:
Title: Queue Pitfalls and Problem Solving
Description: Learn common pitfalls, edge cases, and practice solving queue-based problems.
Content Type: text
Duration: 420
Order: 3
Text Content:


# Common Pitfalls and Considerations

While conceptually simple, improper use or implementation of queues can lead to issues.

## 1\. Queue Overflow and Underflow

* **Overflow:** Occurs in fixed-size array-based queues when an attempt is made to **Enqueue** an element into a full queue. Without proper capacity checks, this can lead to errors or data loss.  
* **Underflow:** Occurs when an attempt is made to **Dequeue** an element from an empty queue. Always check `IsEmpty` before Dequeueing.

## 2\. Inefficient Array Shifting

If a queue is implemented using a simple, non-circular array where the Dequeue operation is performed by shifting all subsequent elements to the front, the time complexity becomes **O(n)**. This is a severe performance bottleneck for large queues.

## 3\. Priority Inversion

While not a direct queue implementation issue, the common use of queues in task scheduling can lead to **Priority Inversion**. This happens when a high-priority task is blocked by a low-priority task that is currently in the queue, leading to unpredictable delays.

## 4\. Incorrect Pointer Management in Linked Lists

In linked list implementations, failing to correctly update the **front** and **rear** pointers during Dequeue and Enqueue, especially when the queue transitions from empty to having one element (and vice versa), can lead to a broken queue state.

Class 3.3.3:
  Title: Stack & Queues
  Description: Stack and Queue Data structures
  Content Type: contest
  Duration: 900
  Order: 3
  Contest URL: https://www.scaler.com/test/a/StAndQue
  Contest Questions: 4
  Contest Syllabus: 
Monotonic Stack
Queue 

Module 4:
Title: Hierarchical Data Structures - Trees and Heaps
Description: Master tree-based hierarchical data structures. Learn tree traversals, Binary Search Tree operations, heap properties, and priority queue implementations.
Order: 4
Learning Outcomes:
Understand tree terminology and special tree types
Master DFS and BFS traversal patterns
Implement Binary Search Tree operations efficiently
Apply heap data structures for priority-based problems

Topic 4.1:
Title: Trees - The Foundation
Order: 1

Class 4.1.1:
Title: Tree Fundamentals and Terminology
Description: Understand tree structure, terminology, and special types of trees.
Content Type: text
Duration: 540
Order: 1
Text Content:	

# The World of Trees: A Comprehensive Guide

# Introduction

In computer science, a "**tree**" is a non-linear abstract data type that simulates a hierarchical structure. It consists of a root value and subtrees of children connected by a parent node, represented as a set of linked nodes. Unlike physical trees, the computer science tree is usually drawn upside down, with the root at the top and the leaves at the bottom.

Key terminology:

* **Node:** A structure that may contain a value or data, and references to its children.  
* **Root:** The topmost node of a tree.  
* **Edge/Branch:** The link between any two nodes.  
* **Leaf (External Node):** A node with no children.  
* **Internal Node:** A node with at least one child.  
* **Parent:** The predecessor of a node.  
* **Child:** The successor of a node.

# Different Types of Trees

Trees are versatile and are specialized into many different types to optimize for various operations.

| Tree Type | Description | Optimization/Use Case |
| :---- | :---- | :---- |
| General Tree | A hierarchical structure where each node can have zero or more children. | General hierarchical data representation (e.g., file systems, organization charts). |
| Forest | A collection of disjoint trees. | Used in graph theory to describe a graph without cycles. |
| Binary Tree | Each node has at most two children, referred to as the left child and the right child. | Searching, expression parsing, data compression. |
| Binary Search Tree (BST) | A special binary tree where the key in each internal node is greater than all keys in its left subtree and less than all keys in its right subtree. | Efficient searching, insertion, and deletion. |
| AVL Tree | A self-balancing Binary Search Tree where the difference between the heights of the left and right subtrees of every node is at most one. | Guarantees O(log n) complexity for all basic operations. |
| Red-Black Tree | A self-balancing Binary Search Tree using a color property (red or black) to maintain balance. | Used in many programming language libraries (e.g., C++ STL, Java's TreeMap). |
| B-Tree | A self-balancing tree data structure that maintains sorted data and optimizes for disk I/O. | Databases and file systems. |

Class 4.1.2:
Title: Binary Tree and Binary Search Tree
Description: Binary Search Tree operations including search, insert, and delete
Content Type: text
Duration: 600
Order: 2
Text Content:

# Focus on Binary Tree and Binary Search Tree (BST)

## Binary Tree

A fundamental tree structure where the number of children per node is limited to at most two.

Image URL:  https://drive.google.com/file/d/1XrW5QbX4yCNqeKskBZjkwOLejlyfcNZ1/view?usp=drive_link

Key Properties:

* **Full Binary Tree:** Every node has either zero or two children.  
* **Complete Binary Tree:** Every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.

Common Traversals:

1. **Inorder:** Left \-\> Root \-\> Right  
2. **Preorder:** Root \-\> Left \-\> Right  
3. **Postorder:** Left \-\> Right \-\> Root

## Binary Search Tree (BST)

A BST is a powerful specialization of a binary tree that facilitates rapid search operations.

**Defining Property (The BST Invariant):**  
For any node, N:

* All keys in its left subtree are less than the key in N.  
* All keys in its right subtree are greater than the key in N.

An inorder traversal of a BST always yields the keys in sorted order.

Time Complexities (Average Case):

| Operation | Complexity |
| :---- | :---- |
| Search | O(log n) |
| Insertion | O(log n) |
| Deletion | O(log n) |

# Important Things About Trees to Remember

Image URL:  https://drive.google.com/file/d/1a1xKVDC-J_2zilEmuQFFHcdqyhiyHbC-/view?usp=drive_link

1. **Recursive Nature:** Tree problems are often solved elegantly using recursion, as a tree is a naturally recursive structure (a tree is a root and a set of subtrees).  
2. **Height vs. Depth:**  
   * **Depth of a node:** The number of edges from the root to that node.  
   * **Height of a node:** The number of edges on the longest path from the node to a leaf.  
   * **Height of the tree:** The height of the root node.  
3. **Efficiency Dependency:** The $O(\\log n)$ efficiency of BST operations hinges entirely on the tree being *balanced*. If a BST becomes *unbalanced* (e.g., creating a linked-list-like structure), the complexity degrades to $O(n)$.  
4. **Balance Matters:** For critical applications, self-balancing BSTs like AVL Trees or Red-Black Trees should be used to guarantee worst-case logarithmic performance.

# Edge Cases to Consider

When implementing or analyzing tree algorithms, always test these edge cases:

* **Empty Tree:** The root is NULL.  
* **Single Node Tree:** The root is a leaf node.  
* **Skewed Tree:** A highly unbalanced tree (e.g., all nodes are in the left subtree), which simulates a linked list. This is the worst-case scenario for an unbalanced BST.  
* **Insertion/Deletion on the Root:** Special handling is often required.  
* **Deleting a Node with Two Children (in a BST):** This requires finding the inorder successor (smallest node in the right subtree) to replace the deleted node, maintaining the BST property.  
* **Tree with Duplicate Keys:** Does the BST allow duplicates? If so, where do they go (left or right)? This design choice must be consistent.

# Common Pitfalls in Trees

| Pitfall | Description | Mitigation |
| :---- | :---- | :---- |
| Forgetting Base Cases in Recursion | A recursive function must have a correct base case (usually when the node is NULL). | Always define the `if (node == NULL)` condition first and return an appropriate value. |
| Improper BST Property Maintenance | During insertion or deletion, the rule that left \< root \< right is violated, leading to incorrect search results. | Carefully ensure the inorder successor logic is correct during two-child node deletion. |
| Confusing Traversal Orders | Mistaking the order of operations, especially where the "Root" operation occurs. | Practice and visualize the specific order: Inorder is *sorted* for BSTs. |
| Off-by-One Errors in Height/Depth | Confusing 0-based indexing (where root depth is 0\) with 1-based. | Be consistent with the definition used. A common definition for height is *number of edges* on the longest path. |

Class 4.1.3:
  Title: Trees
  Description: Binary Trees & Binary Search Tree
  Content Type: contest
  Duration: 900
  Order: 3
  Contest URL: https://www.scaler.com/test/a/Trees
  Contest Questions: 4
  Contest Syllabus: 
Binary Tree
Binary Search Tree

Topic 4.2:
Title: Heaps - Priority Queue Implementation
Order: 2

Class 4.2.1:
Title: Heap Fundamentals and Properties
Description: Understand heap structure, complete binary tree property, and heap order property for Max and Min heaps.
Content Type: text
Duration: 540
Order: 1
Text Content:


# Understanding Heaps

A heap is a highly efficient, specialized tree-based data structure primarily used to implement a Priority Queue. It maintains a specific ordering among its elements, ensuring fast retrieval of the highest or lowest priority item. Heaps are typically realized as an array, utilizing the properties of a complete binary tree for optimized storage and quick parent/child lookups.

# Key Heap Properties

A valid binary heap must adhere to two core structural rules:

## 1\. Complete Binary Tree Property

A binary heap is always a **Complete Binary Tree**. This means:

* All levels are entirely filled, except possibly the last one.  
* Nodes in the last level are placed as far left as possible.

## 2\. Heap Order Property (Types of Heaps)

This property dictates the value relationship between parent and child nodes, leading to the two main types of heaps:

### Max Heap

* A max heap ensures that the largest element is always at the root. Each parent node is greater than or equal to its children.  

Image URL:  https://drive.google.com/file/d/1UusYWuBCDOFlnFi1Yw5fZsc4opUvhtg8/view?usp=drive_link

Used for:

* Heapsort  
* Priority queues for max values  
* Finding the k largest elements

### Min Heap

* A min heap ensures that the smallest element is always at the root. Each parent node is less than or equal to its children.

Image URL:  https://drive.google.com/file/d/1N98PeNsWHVjZbMC-XfPvghoLDQkYmKnK/view?usp=drive_link

Used for:

* Dijkstra’s shortest path algorithm  
* Prim’s minimum spanning tree  
* Priority scheduling  
* Finding the k smallest elements

# Essential Heap Operations

Heaps are defined by the efficiency of their fundamental operations, particularly insertion and deletion, which ensure the structure remains a valid heap.

| Operation | Description | Time Complexity |
| :---- | :---- | :---- |
| Insertion | Adds a new element, then "heapifies up" (or "bubbles up") to restore the heap property. | O(log n) |
| Deletion | Removes the root element (the max/min), and then "heapifies down" (or "bubbles down") to restore the heap property. | O(log n) |
| Peek | Retrieves the value of the root element (maximum or minimum) without removing it. | O(1) |
| Build Heap | Constructs a valid heap from an unsorted collection of $n$ items. | O(n) |

Class 4.2.2:
Title: Heap Pitfalls and Famous Problems
Description: Learn common pitfalls in heap implementation and master famous heap-based problems.
Content Type: text
Duration: 600
Order: 3
Text Content:

# Common Pitfalls and Challenges with Heaps

While powerful, using and implementing heaps can introduce several common issues:

## 1\. Mismanaging the Array-Based Indexing

Since heaps are often implemented using an array, incorrect indexing is a frequent error.

* **Parent Index:** If a node is at index i, its parent is typically at floor (i-1)/2 .  
* **Child Indices:** Its children are typically at 2i \+ 1 (left) and 2i \+ 2 (right).  
* **Pitfall:** Off-by-one errors (e.g., assuming 1-based indexing when using 0-based indexing) can lead to incorrect parent/child lookups and heap corruption.

## 2\. Failure to Restore Heap Property

The most crucial aspect of any heap operation (Insertion or Deletion) is maintaining the heap order.

* **Pitfall:** After inserting a new element or replacing the root during deletion, forgetting or incorrectly implementing the *heapify up* (or *bubble up*) and *heapify down* (or *bubble down*) procedures will break the heap structure and invalidate future Max/Min lookups.

## 3\. Confusing Min Heap and Max Heap Logic

It is easy to mix up the comparison logic between the two heap types, especially during implementation.

* **Pitfall:** When implementing a **Max Heap**, using a `<` comparison instead of a `>` comparison during the *heapify* process will result in an incorrect structure that behaves like a Min Heap, or worse, an entirely invalid structure. Always double-check the required inequality for the parent-child relationship.

## 4\. Space Complexity Misconceptions

While the primary operations are logarithmic in time, developers must be mindful of the space used.

* **Pitfall:** When a heap is implemented on top of a dynamically growing structure (like a list or vector), failing to manage the capacity correctly can lead to excessive memory reallocation overhead or running out of memory for very large datasets.

# Famous Heap Questions

# I. Priority Queue & Selection Problems

These problems often involve maintaining a sorted list of the "best" or "worst" elements encountered so far.

1. **Find the Kth Smallest/Largest Element:**  
   * **Question:** Given an unsorted array and a number *K*, find the *K*\-th smallest (or largest) element in the array.  
   * **Heap Technique:** Use a Max Heap of size *K* for the *K*\-th smallest element (or a Min Heap for the *K*\-th largest).  
2. **Top K Frequent Elements:**  
   * **Question:** Given a non-empty list of words or numbers, return the *K* most frequent elements.  
   * **Heap Technique:** Use a Min Heap of size *K* to store (frequency, element) pairs, ensuring the least frequent of the top *K* is always at the root.  
3. **Merge K Sorted Lists/Arrays:**  
   * **Question:** Merge *K* sorted linked lists (or arrays) into one single sorted list.  
   * **Heap Technique:** Use a Min Heap to keep track of the smallest current element from all *K* lists.  
4. **K Closest Points to Origin:**  
   * **Question:** Given an array of points on a plane and an integer *K*, find the *K* closest points to the origin (0, 0\).  
   * **Heap Technique:** Use a Max Heap of size *K* based on the distance from the origin.

# II. Stream Processing Problems

These problems deal with data coming in a continuous stream, and a result must be maintained or calculated in real-time.

1. **Find Median from Data Stream:**  
   * **Question:** Design a data structure that supports adding a new number and finding the median of all numbers added so far in $O(\\log n)$ time.  
   * **Heap Technique:** Identical to the Sliding Window Median technique—use a balanced Max Heap (lower half) and Min Heap (upper half).

# III. Miscellaneous & Advanced Heap Applications

1. **Sort K Sorted Array (or Nearly Sorted Array):**  
   * **Question:** An array is *K* sorted if every element is at most *K* positions away from its sorted position. Sort the array efficiently.  
   * **Heap Technique:** Use a Min Heap of size *K* to maintain the currently considered elements.  
2. **Task Scheduler:**  
   * **Question:** Given a character array representing tasks the CPU needs to do and a non-negative integer $n$ (the cool-down period), find the least number of intervals required to complete all tasks.  
   * **Heap Technique:** Use a Max Heap to prioritize the tasks with the highest remaining frequency, considering the cool-down constraint.



Module 5:
Title: Advanced Algorithmic Techniques - Recursion and Backtracking
Description: Master recursive problem-solving and backtracking for constraint satisfaction. Learn to break down problems into subproblems and systematically explore solution spaces with pruning.
Order: 5
Learning Outcomes:
Understand recursion and call stack mechanics
Master the backtracking paradigm for constraint satisfaction
Implement choose-explore-unchoose patterns
Apply pruning techniques for efficient search

Topic 5.1:
Title: Recursion Fundamentals
Order: 1

Class 5.1.1:
Title: Understanding Recursion
Description: Master the fundamentals of recursion including base cases, recursive cases, and call stack mechanics.
Content Type: text
Duration: 600
Order: 1
Text Content:

# The Art of Self-Reference: Recursion

Recursion is a programming technique where a function calls itself to solve a problem. Instead of solving a large problem all at once, the function breaks the problem down into smaller, self-similar sub-problems.

**The Golden Rule:** A recursive function continues to call itself until it reaches a state where the answer is obvious (the "Base Case").

**Analogy: Russian Nesting Dolls (Matryoshka)** Imagine opening a Russian nesting doll. Inside the big doll is a smaller doll. You open that one, and there is an even smaller one. You keep repeating this process (recursion) until you find the tiniest doll that cannot be opened (the base case). Then, you put them all back together.

For this process to be successful and terminate correctly, every recursive function must be designed with two essential components:

1. **The Base Case (The Stop Condition):** This is the simplest instance of the problem that can be solved directly, without further recursion. It serves as the guard against infinite loops, which lead to a stack overflow error.  
2. **The Recursive Step (The Self-Call):** This step reduces the current problem to a smaller, simpler version of the same problem and makes a self-call to solve that simpler version. This move must always progress toward the base case.

## **How It Works: The Call Stack** 

To understand recursion, you must understand the **Call Stack**. The computer uses a stack data structure (Last-In, First-Out) to keep track of function calls.

Example: Calculating Factorial of 3 (3\!)

Mathematical definition: n\! \= n \*(n-1)\!

```python
def factorial(n):
    # 1. Base Case
    if n == 1:
        return 1
    
    # 2. Recursive Case
    else:
        return n * factorial(n - 1)
```

1. ### **Initial Call: The Stack Begins to Fill**

   The process starts with the first call to `factorial(3)`. A frame for this function call is pushed onto the stack. It cannot complete its calculation yet because it needs the result of `factorial(2)`

Image URL:  https://drive.google.com/file/d/1wjy1vOO84vOiX5TOttFeEdUR_0AJ226A/view?usp=drive_link

2. ### **The Peak: Reaching the Base Case**

   Subsequent calls to `factorial(2)` and `factorial(1)` are made, each pausing the previous function and pushing a new frame onto the stack. The stack reaches its maximum depth when `factorial(1)` is called. This is the **base case**, and it can immediately return the value `1` without making any further calls.

Image URL:  https://drive.google.com/file/d/1nP03-KG2hd3g9XHPKqYHUyXRjd9JOa6k/view?usp=drive_link

3. ### **Unwinding: Returning the Final Result**

   Once the base case (`factorial(1)`) returns, the stack begins to unwind. `factorial(2)` receives the `1`, calculates `2 * 1 = 2`, and returns this value to `factorial(3)`. Finally, `factorial(3)` receives the `2`, calculates `3 * 2 = 6`, and returns this as the final result of the entire process. The stack is now empty.

Image URL:  https://drive.google.com/file/d/1jKmy5THy411ji4x1vEaX6h53Dxx8AMuq/view?usp=drive_link

---

Class 5.1.2:
Title: Types of Recursion
Description: Recursion types, and learn common recursion pitfalls, stack overflow issues, and optimization techniques including memoization.
Content Type: text
Duration: 600
Order: 2
Text Content:


# Types of Recursion

Recursion can be categorized based on *when* the recursive call is made relative to the function's final operation and the structure of the calls.

# Head Recursion

In head recursion, the recursive call is the very first operation in the function. The function performs the recursive step *before* processing the current state's data.

| Characteristic | Example |
| :---- | :---- |
| All operations are performed on the return from the recursive call. Often used for algorithms that require reversing the order of execution, as the stack unwinds. | Printing a list in reverse order. |

# Tail Recursion

In tail recursion, the recursive call is the last operation executed in the function. Nothing is left to do in the current stack frame after the recursive call returns.

| Characteristic | Example |
| :---- | :---- |
| This structure allows many compilers to perform Tail Call Optimization (TCO), transforming the recursion into an iteration (a loop) and preventing the stack from growing indefinitely. | Calculating the factorial of a number using an accumulator parameter. |

# Tree Recursion

Tree recursion occurs when a function makes more than one recursive call within its body. This pattern naturally generates a call tree, where each function call branches out into multiple sub-calls.

| Characteristic | Example |
| :---- | :---- |
| It is used for problems that involve exploring multiple possibilities or paths, often leading to a complex call structure. | The calculation of the Fibonacci sequence, where Fib(n) calls both Fib(n-1) and Fib(n-2). |

| Feature | Recursion | Iteration (Loops) |
| :---- | :---- | :---- |
| **Code Style** | Elegant, declarative, often shorter. | Imperative, can get verbose. |
| **Complexity** | Great for trees, graphs, and sorting (Merge/Quick Sort). | Great for simple lists and counters. |
| **Memory** | High memory usage (Call Stack overhead). | Low memory usage (constant space). |
| **Risk** | Risk of Stack Overflow if too deep. | Risk of infinite loops (cpu hang). |

# Common Pitfalls 

| Pitfall | Consequence | Best Practice |
| :---- | :---- | :---- |
| Missing Base Case | Infinite Recursion (Stack Overflow) | Always define a clear, reachable base case. |
| Non-Converging Step | Infinite Recursion (Stack Overflow) | Ensure the recursive step moves the input closer to the base case. |
| Overlapping Subproblems | Highly Inefficient (Exponential Time Complexity) | Consider memoization or dynamic programming to cache results for repeated calls. |


Topic 5.2:
Title: Backtracking - Systematic Search
Order: 2

Class 5.2.1:
Title: Backtracking Fundamentals
Description: Understand backtracking as a systematic search technique with state-space tree exploration and pruning.
Content Type: text
Duration: 600
Order: 1
Text Content:

# The Art of Backtracking

Backtracking is a systematic, general algorithm for finding all (or some) solutions to computational problems that incrementally builds candidates to the solutions. It is fundamentally a search technique used to explore a set of candidate solutions. Crucially, it abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution. This technique of early elimination is called **pruning**.

# I. The Core Concept: A Search in a State-Space Tree

Backtracking can be visualized as navigating a state-space tree. The root represents the initial state, and the branches represent choices or steps taken toward a solution.

## The Five-Step Process

1. **Start:** Begin at the root of the search tree (initial state).  
2. **Explore (Choice):** Extend the current partial solution by choosing an available option (moving to a child node).  
3. **Check (Constraint):** Determine if the new state violates any constraints.  
   * If viable, continue exploring from this new state.  
   * If it violates constraints (a dead-end), **Prune** the current branch and proceed to Step 4\.  
4. **Backtrack:** If a path leads to a dead end or all choices from the current node are exhausted, return to the immediate previous node (parent) and undo the last choice.  
5. **Goal:** If a complete and valid solution is found, record it and potentially continue searching for more solutions.

# II. When and Why to Use Backtracking

Backtracking is ideal for problems where the solution space is vast but can be structured as a sequence of decisions. It's an exhaustive search but made efficient by the power of pruning.

| Problem Category | Description | Classic Examples |
| :---- | :---- | :---- |
| **Constraint Satisfaction** | Finding states that satisfy specific conditions.Usually very small constraints | N-Queens Problem, Sudoku Solver |
| **Generative Problems** | Generating all possible arrangements or subsets. | Generating all permutations of a string, Subset Sum Problem |
| **Pathfinding** | Finding a valid path between two points under constraints. | Maze Solving, Hamiltonian Cycle |

Image URL:  https://drive.google.com/file/d/1lNzpjwG-Ad8CdQsMF-RoGFyeFgSFNdhX/view?usp=drive_link

# III. General Algorithm Structure (Recursive Implementation)

The elegance of backtracking lies in its recursive structure, which naturally handles the forward exploration and the backward "undo" steps.

```java
function Solve(CurrentState):

    if CurrentState is a goal state:
        Record Solution
        return

    for each CandidateOption in AvailableOptions(CurrentState):

        // 1. Check/Prune: Is this a valid move?
        if IsSafe(CurrentState, CandidateOption):

            // 2. Make Move (Explore)
            CurrentState.Add(CandidateOption)

            // 3. Recursive Call
            Solve(CurrentState)

            // 4. Undo Move (Backtrack)
            CurrentState.Remove(CandidateOption)
```

# IV. Key Components of Backtracking

Every successful backtracking implementation relies on clearly defined components:

## 1\. The Choice

At each step, the algorithm must make a decision about how to extend the current partial solution.

## 2\. The Constraints (The Pruning Mechanism)

These are the rules that define a valid partial solution. The `IsSafe` function is where the massive search space reduction occurs. If a partial solution violates a constraint, the entire subtree stemming from that decision is immediately ignored. This is the efficiency gain of backtracking.

## 3\. The Goal

This defines what constitutes a complete, satisfactory solution. Once reached, the recursion stops for that branch.

---

#  **Backtracking vs Recursion**

| Backtracking | Recursion |
| ----- | ----- |
| Explores **all valid options**, tries and undoes | Solves smaller subproblems repeatedly |
| Used for constraint satisfaction | Used for divide‑and‑conquer, DP, trees |
| Often exponential | Often polynomial/logarithmic |
| Explicit undo step | No undo step |

Class 5.2.3:
Title: Backtracking Pitfalls and Edge Cases
Description: Learn common pitfalls in backtracking implementation and handle edge cases correctly.
Content Type: text
Duration: 600
Order: 3
Text Content:

# Pitfalls in Backtracking Implementation

## 1\. Incorrect Pruning Logic

The core efficiency of backtracking relies on its ability to prune the search space.

* **Pitfall:** Pruning too aggressively (incorrect constraint checking) can lead to missing valid solutions.  
* **Pitfall:** Not pruning enough (weak or no constraint checking) results in a brute-force search, causing Time Limit Exceeded (TLE) errors, especially with large inputs.

## 2\. State Restoration Errors

Backtracking fundamentally requires the ability to undo changes made to the problem state before moving to the next path.

* **Pitfall:** Failure to properly revert the state after a recursive call. This leads to an "infected" state for subsequent branches, resulting in incorrect solutions or runtime errors due to unexpected state.

## 3\. Duplication of Work/Redundant Calls

If the problem has overlapping subproblems, a standard recursive backtracking approach will solve the same subproblem multiple times.

* **Pitfall:** Lack of memoization (dynamic programming) for problems where subproblems overlap, resulting in exponential time complexity when a polynomial solution may exist.

## 4\. Ordering of Choices

The order in which choices are explored can drastically impact performance.

* **Pitfall:** Exploring choices in an arbitrary or non-optimized order. For example, in the N-Queens problem, choosing the column for the first row might be less efficient than a more constrained choice (like a variable with the smallest domain). This doesn't change correctness but can dramatically increase the number of nodes explored.

# Edge Cases

| Category | Description | Backtracking Implication |
| :---- | :---- | :---- |
| **Empty or Trivial Input** | Input size is zero, or the solution space is immediately obvious (e.g., $N=1$ for N-Queens). | The base case must handle these inputs correctly to return the trivial solution or an empty set of solutions without infinite recursion. |
| **No Solution Exists** | The problem is set up such that no valid configuration can be found (e.g., an unsolvable Sudoku puzzle). | The algorithm must terminate gracefully, returning a clear indication (e.g., `false`, `null`, or an empty list) after exhausting all branches. This often highlights the need for robust stopping conditions. |
| **Symmetry in Solutions** | Multiple search paths lead to mathematically identical solutions (e.g., rotating a solution in a grid problem). | If only unique solutions are required, special logic must be implemented to detect and skip symmetric branches. This is a complex optimization often requiring canonical representation. |
| **Deep Recursion/Stack Overflow** | Problems with a very large depth (e.g., a pathfinding problem in a massive grid with few constraints). | The maximum recursion depth limit may be hit. This may necessitate converting the recursive solution to an iterative one using an explicit stack or optimizing the pruning to reduce depth. |
| **Constraints on Solution Size** | Constraints limit the number of items in the final solution (e.g., "Find all subsets of size K"). | The pruning condition must incorporate this size constraint. It's an edge case when the size limit is small relative to the input size, offering massive pruning opportunities. |


	
Module 6:
Title: Dynamic Programming 
Description: Master dynamic programming for solving optimization problems with overlapping subproblems. Learn to identify DP patterns, define state transitions, and implement both top-down and bottom-up approaches.
Order: 6
Learning Outcomes:
Identify problems with optimal substructure and overlapping subproblems
Master memoization (top-down) and tabulation (bottom-up) techniques
Define DP states and recurrence relations correctly
Solve classic DP problems across multiple categories

Topic 6.1:
Title: Dynamic Programming Fundamentals
Order: 1

Class 6.1.1:
Title: Introduction to Dynamic Programming
Description: Understand when to use DP, identify optimal substructure and overlapping subproblems.
Content Type: text
Duration: 660
Order: 1
Text Content:

# Dynamic Programming

Dynamic programming (DP) is a technique for improving the runtime performance of problems with optimal substructure by saving previously calculated values that are repeated frequently. This is often accomplished by maintaining a hash table of previous values outside of the inner loop so that future iterations can reference previously saved values. More generally, DP uses caching to ensure that each subproblem is solved at most once.

*Note: As a rule of thumb, any problem that can be solved with DP can also be solved recursively, but DP is most helpful when the problem has overlapping subproblems.*

Dynamic programming often appears in programming interviews, but even if you aren't directly asked to solve a problem using DP, it’s a great way to improve your brute force solution.

### **When to use dynamic programming in an interview**

You'll recognize DP problems via their two common properties:

**Optimal substructure:** We say that a problem has optimal substructure if its optimal solution for an input of size n can be expressed as a combination of the optimal solutions for smaller inputs of size m\<n. For example, consider the "paths in a grid" problem from the Recursion lesson \- given a rectangular grid and the ability to move either down or right, return the number of paths from the upper left-hand corner to the lower right-hand corner. We already determined that we could express the answer as the sum of the paths from the squares directly to the right and below of the current square:

NumberOfPaths(i,j) \= NumberOfPaths(i+1,j) \+ NumberOfPaths(i,j+1)

**Overlapping subproblems:** We say that a problem has overlapping subproblems if — when the problem is broken down into recursive subproblems — some subproblems are solved more than once. For example, consider a function Fibonacci(n) that outputs the n-th Fibonacci number (F(n)). As a refresher, the Fibonacci sequence is defined by the recurrence relation F(n) \= F (n-2) \+ F(n-1), with base cases of F(0) \= 0 and F(1) \= 1. Then the recursive function call tree for fibonacci(4) might look something like this:

Image URL:  https://drive.google.com/file/d/1nX5Ie984toh6hlz0wQAENfrRtNbRQ_Z_/view?usp=drive_link

But all of the red boxes are calculations that happen more than once \- in total, we actually compute fibonacci(1) three times in this tree\! In fact, the runtime complexity of this solution is O(2^n), since each increment of n by 1 approximately doubles the amount of computation required. In DP, we use caching to optimize this solution by ensuring that we never have to repeat a calculation.


Class 6.1.2:
Title: Memoization - Top-Down Dynamic Programming
Description: Master memoization technique combining recursion with caching for efficient computation.
Content Type: text
Duration: 720
Order: 2
Text Content:


## Memoization (top-down DP)

*Memoization \= Recursion \+ Caching*

Image URL:  https://drive.google.com/file/d/1toAu7wXyq5xi8CPa2ulzeFoX0Xgu1SGH/view?usp=drive_link

In the previous section, we saw how recursive algorithms with overlapping subproblems are often inefficient to compute because many sub problems are repeated. In memoization, we solve this problem by caching the result of a calculation the first time we encounter it and re-using it for future calls on the same input. The code for this might look something like this:

```python
memo = {-1}

def fibonacci(n: int):
	# Check if we've encountered this input before.
	if n in memo:
		return memo[n]

	# Base cases
	if n == 0 or n == 1:
		return memo[n]=n


     if(memo[n]!=0)return memo[n]

	# Recursive step
	output = fibonacci(n-2) + fibonacci(n-1)

	# Memoize the solution before returning
	memo[n] = output
	return output
```

Now since we only compute fibonacci(i) once for each possible 0 ≤ i ≤ n, we've reduced the runtime for fibonacci(n) from O(2^n) to O(n). This is known as a top-down solution because we recursively compute the solution starting from the largest input and move towards the base case.

However, sometimes we may not be able to use a cache as straightforward as a hash map. If we're searching in multiple dimensions or axes, we may need a multidimensional cache as well. Let's look at an example \- suppose you have an m x n matrix filled with 0s and 1s. How would you implement a function maximal\_square(arr) to find the area of the largest square containing only 1s?

Image URL:  https://drive.google.com/file/d/1XtKFNbykOmVdMJZ2HsCL6-vZHWOEjh5I/view?usp=drive_link

We can see that in this example, maximal\_square(arr)=4. But to solve it algorithmically, we can start by noticing the overlapping subproblems. If we were to solve this in a brute force way, we could first identify the largest square of 1s that any cell (i,j) forms the lower right hand corner of. Let's call the function that returns the side length of this square max\_s\_at(i,j). Then, we could identify the cell with the largest such square, and return that square's area as our answer. In short, maximal\_square(arr)=max\_{i,j}(max\_s\_at(i,j))^2.

However, for a given cell (i,j) that contains a 1, it can only be the lower right corner of a square of size s^2 if its neighbors directly to the north, west, and northwest are the lower right-hand corners of squares of size at least (s-1)^2. To see this, consider the bolded cell below.

Image URL:  https://drive.google.com/file/d/10ggvaTAeOQps57FtxHOQzKnnyt0P1g1C/view?usp=drive_link

Its north, west, and northwest neighbors are colored in green, blue, and red, respectively. We can similarly color code the largest square that each of these neighbors belongs to. As shown above, the northwest (red) cell forms the corner of a square of size 4, whereas the north (green) and west (blue) neighbors form corners of squares of size 1 each. Then by our previously stated rule, the largest value that s can have in this case is 2\. In summary, s is one more than the minimum side-length of the squares that its north, west, and northwest neighbors are the corners of. We can express this more precisely as:

# `max_s_at(i,j) = 1 + min(max_s_at(i-1,j), max_s_at(i,j-1), max_s_at(i-1,j))`

# As we can see, this is the recursive step in a recursive algorithm\! In a DP context, this is sometimes also known as a recurrence relation. Furthermore, this recurrence relation has overlapping subproblems \- for instance, both max\_s\_at(1,0) and max\_s\_at(0,1) require calculating max\_s\_at(0,0), which we can memoize. Since our input now consists of two arguments, we can use a two-dimensional array as our cache instead, where the row and column indices correspond exactly to the indices of the input array. Putting this all together, our code might look something like this:

```python
def maximal_square(arr):
    if not arr:
        return 0

    m = len(arr)
    n = len(arr[0])
    dp = [[None for _ in range(n)] for _ in range(m)] 

    def max_s_at(i, j):
        # Check bounds
        if i < 0 or j < 0 or i > m or j > n:
            return 0

        if arr[i][j] == 0:
            dp[i][j] = 0
            return 0

        # Check the cache
        if dp[i][j] is not None:
            return dp[i][j]

		# Recurrence relation
        north = max_s_at(i-1, j)
        west = max_s_at(i, j-1)
        northwest = max_s_at(i-1, j-1)
        out = 1 + min(min(north, west), northwest)

	# Store the new results in the cache and return
        dp[i][j] = out
        return out

    max_area_so_far = 0
    for i in range(m):
        for j in range(n):
            max_s_curr = max_s_at(i,j)
            if max_s_curr**2 > max_area_so_far:
                max_area_so_far = max_s_curr**2
    return max_area_so_far
```

Bottom-up  
Above, we used recursion combined with caching to ensure that no sub-problems were solved more than once. However, this approach still required recursion, which can be costly both in execution time and in stack memory. We could optimize our solution even more if we could solve the problem iteratively\!

Bottom-up dynamic programming accomplishes this by iteratively populating the entire cache, rather than recursively populating individual elements of the cache whenever a new input is encountered. If we already know what the base case and recurrence relation are, we can simply start by filling in the value for the base case, and then using the recurrence relation to populate the rest of the cache.

Let's return to the maximal square example above. Since we are filling in the areas for the maximal squares that each cell could be the lower right hand corner of, it makes sense to start in the upper left hand corner. We know that all cells in the upper row can only be parts of squares of area at most 1, so the first row of our cache is the same as the first row of the array:

Image URL:  https://drive.google.com/file/d/1-V12ZaNJfK5jrqJZJ2378xNwGGfPg04d/view?usp=drive_link

Next, we can continue using our recurrence relation from before to fill in the rest of the cache, going from left to right and top to bottom. For example,

`dp[1,0] = 1 + min(dp[1,-1]dp[0,0],dp[0,-1])`  
        `= 1 + min(0,0,0)`  
  `= 1`

and so on. Filling in the entire cache gives:

Image URL:  https://drive.google.com/file/d/1DlPKd1qV2hVAbZn2g-xOclqhBXgyCLrG/view?usp=drive_link

Since we know that the (i,j)-th cell in dp contains the value of max\_s\_at(i,j) and maximal\_square(arr)=max\_{i,j}(max\_s\_at(i,j))^2 , we can obtain the final answer by finding the maximum value in dp and squaring it to calculate the area. Now we've not only found the answer in O(mn) time and space, but we also didn't require any recursive calls in order to do so\!

Lastly, some sample code for this problem might look like this:

```python
def maximal_square_bottom_up(arr):
    if not arr:
        return 0

    m = len(arr)
    n = len(arr[0])
    dp = [[0 for _ in range(n)] for _ in range(m)] 

    # Fill in the cache and keep track of max
    max_area_so_far = 0
    for i in range(m):
        for j in range(n):
            if arr[i][j]:
                north = dp[i-1][j] if i else 0
                west = dp[i][j-1] if j else 0
                northwest = dp[i-1][j-1] if (i and j) else 0
                dp[i][j] = 1 + min(min(north, west), northwest)

            curr_area = dp[i][j]**2
            if curr_area > max_area_so_far:
                max_area_so_far = curr_area
    return max_area_so_far
```

Class 6.1.3:
Title: Tabulation - Bottom-Up Dynamic Programming
Description: Master bottom-up approach by iteratively populating the entire cache from base cases.
Content Type: text
Duration: 720
Order: 3
Text Content:

# Memoization or Tabulation

A DP solution typically involves two key techniques to avoid redundant calculations:

| Technique | Description | Approach |
| :---- | :---- | :---- |
| **Memoization (Top-Down)** | Storing the results of expensive function calls and returning the cached result when the same inputs occur again. | The problem is solved recursively, and the results are stored in a table (like a dictionary or array) as they are computed. |
| **Tabulation (Bottom-Up)** | Solving the problem by iteratively filling up a table (usually an array or matrix) that stores the solutions to subproblems, starting from the smallest ones. | The problem is solved iteratively, starting from the base case and building up to the final solution. |

# The Four Steps to a DP Solution

Applying Dynamic Programming involves a systematic process:

## 1\. Characterize the Structure of an Optimal Solution

Define what the optimal solution looks like and how it relates to optimal solutions of smaller subproblems (Optimal Substructure).

## 2\. Recursively Define the Value of an Optimal Solution

Formulate the **recurrence relation**. This is a mathematical formula that expresses the solution to the original problem in terms of the solutions to its subproblems.

## 3\. Compute the Value of an Optimal Solution

This is where you choose between Memoization (top-down with recursion) or Tabulation (bottom-up with iteration) to implement the recurrence relation and store the results of overlapping subproblems.

## 4\. Construct an Optimal Solution from the Computed Information

Once the value of the optimal solution is calculated, you may need to trace back through the stored subproblem results to reconstruct the actual sequence of choices that led to the optimal value.

Class 6.1.4:
Title: Common DP Patterns and Edge Cases
Description: Compare DP techniques and learn the systematic four-step approach to solving DP problems.
Content Type: text
Duration: 600
Order: 1
Text Content:

# Common Edge Cases in DP

Edge cases are inputs at the boundaries of constraints that can often expose flaws in an otherwise correct general algorithm.

# 1\. Base Cases (Initialization)

The base cases are the smallest subproblems that can be solved directly without recurrence. Incorrect initialization is one of the most frequent sources of DP bugs.

| Pitfall | Description | Example (Fibonacci) |
| :---- | :---- | :---- |
| Off-by-one index | For problems involving 0-indexing, forgetting to handle `dp[0]` or `dp[1]`. | If fib(0) \= 0 and fib(1) \= 1, ensure the DP array is correctly sized and initialized for the first two elements. |
| Overlapping base and recursive cases | Defining a recursive step that overwrites a necessary base case value. | In 0/1 Knapsack, the base case for capacity 0 is 0\. Ensure the main loop respects this. |
| Empty/Zero Input | Inputs like an empty array, a string of length zero, or a capacity of zero. | In Longest Common Subsequence, `dp[i][0]` and `dp[0][j]` should be 0\. |

# 2\. Constraints and State Space

The state space defines the range of inputs for your DP table.

| Pitfall | Description | Mitigation |
| :---- | :---- | :---- |
| Array/Table Bounds | Accessing indices outside the defined range of the DP table. | Always check loop conditions and array access expressions to ensure $0 \\le \\text{index} \< \\text{size}$. |
| Maximum Constraint Value | Forgetting to handle the maximum possible input size, which can lead to integer overflow or time limit exceeded (TLE). | Use appropriate data types (e.g., long long in C++) and analyze the time complexity $O(\\text{state} \\times \\text{transitions})$. |
| Negative Numbers | Problems involving costs, weights, or values that can be negative. | Ensure initialization (e.g., of minimum costs) does not rely on zero being the lowest possible value. Use $\\infty$ for unreachable states and $-\\infty$ for maximizing path problems with negative weights. |

# Classic Dynamic Programming Problems

The versatility of DP is demonstrated in many classic problems. Here is a brief overview of some fundamental examples:

## A. The Fibonacci Sequence

This is often the introductory example, where the n{th} Fibonacci number is defined as the sum of the two preceding ones: F(n) \= F(n-1) \+ F(n-2). The subproblems F(k) are calculated multiple times in a naive recursive approach.

| Method | Time Complexity | Space Complexity |
| :---- | :---- | :---- |
| Naive Recursion | O(2^n) | O(n) |
| Dynamic Programming | O(n) | O(n) |

## B. The Knapsack Problem

Given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

## C. Longest Common Subsequence (LCS)

Finding the longest subsequence common to all sequences in a set of sequences (usually two). This is used in bio-informatics (e.g., DNA sequence alignment) and file comparison utilities.

## D. Shortest Path Algorithms

While some shortest path problems (like in unweighted graphs) can be solved without DP, algorithms like **Floyd-Warshall** (for all-pairs shortest path) and certain implementations of **Dijkstra's** (though greedy, it shares principles) are often rooted in DP concepts.

Class 6.1.5:
  Title: Dynamic programming
  Description: Dynamic programming
  Content Type: contest
  Duration: 900
  Order: 1
  Contest URL: https://www.scaler.com/test/a/DynPro
  Contest Questions: 4
  Contest Syllabus: 
Recursion & backtracking
Dp - Memoization & tabulation

Module 7:
Title: Graph Algorithms and Applications
Description: Master graph theory fundamentals and essential graph algorithms. Learn graph representations, traversal techniques, shortest path algorithms, and topological sorting.
Order: 7
Learning Outcomes:
Understand graph representations (adjacency list and matrix)
Master BFS and DFS traversal algorithms
Implement shortest path algorithms (Dijkstra's, Bellman-Ford)
Apply topological sorting for directed acyclic graphs

Topic 7.1:
Title: Graph Fundamentals
Order: 1

Class 7.1.1:
Title: Introduction to Graphs and its Types
Description: Understand graph terminology, types, and representation methods.
Content Type: text
Duration: 600
Order: 1
Text Content:

# Graphs: Structures, Traversal, and Algorithms 

Graphs are among the most versatile and important data structures in computer science, used everywhere from social networks and mapping software to complex biological modeling. This document provides a comprehensive overview of graph fundamentals.

# Introduction to Graphs

A graph is a non-linear data structure comprising **vertices** (nodes) and **edges** (connections) that link pairs of vertices. It is the perfect tool for modeling relationships.

## Key Terminology

* **Vertex (Node):** The basic unit in a graph.  
* **Edge (Arc):** A connection between two vertices, representing a relationship.  
* **Adjacency:** Two vertices are adjacent if they are directly connected by an edge.  
* **Path:** A sequence of connected vertices.  
* **Cycle:** A path that starts and ends at the same vertex.

# Types of Graphs 

## 1\. Undirected Graphs

In an undirected graph, edges have no direction. The relationship is mutual, meaning if an edge exists between vertex A and vertex B, you can traverse from A to B or from B to A.

* **Representation:** An edge is represented as an unordered pair (u, v).  
* **Adjacency:** If u is adjacent to v, then v is also adjacent to u.  
* **Example:** A social network where "being friends" is a mutual relationship. If Person is friends with Person, then Person is also friends with Person.

## 2\. Directed Graphs (Digraphs)

In a directed graph, all edges have a specific direction. The relationship is one-way. An edge from vertex A to vertex B does not imply an edge from B to A.

* **Representation:** An edge is represented as an ordered pair u, v , where the edge goes from u to v.  
* **In-degree and Out-degree:** For a vertex v, the **in-degree** is the number of edges pointing *to* v, and the **out-degree** is the number of edges pointing *from* v.  
* **Example:** A flow chart or a set of one-way streets.

# Classification by Edge Weight

Graphs can also be classified based on whether the edges have an associated value or "weight."

## 1\. Unweighted Graphs

In an unweighted graph, all edges are considered equal, and they typically represent the presence or absence of a relationship.

* **Traversal:** Algorithms focus on the number of edges (hops) for path finding, such as Breadth-First Search (BFS).  
* **Example:** The shortest path between two nodes is the path with the fewest number of edges.

## 2\. Weighted Graphs

In a weighted graph, each edge is assigned a numerical value, or **weight**, representing a cost, distance, or time.

* **Application:** Used for optimization problems.  
* **Shortest Path:** Algorithms like Dijkstra's or Bellman-Ford are used to find the path with the minimum *total weight*, not just the minimum number of edges.  
* **Example:** A road network where weights represent the distance between cities or the travel time.

# Classification by Structure and Connectivity

These types focus on the internal organization and connectivity of the vertices and edges.

## 1\. Simple Graphs

A simple graph is an undirected graph that contains no loops (edges connecting a vertex to itself) and no multiple edges (more than one edge connecting the same pair of vertices). Most graph problems assume a simple graph unless specified otherwise.

## 2\. Multi-Graphs

A multi-graph permits multiple edges between the same two vertices (parallel edges).

* **Application:** Modeling redundant links in a network or multiple routes between two destinations.

## 3\. Connected vs. Disconnected Graphs

A graph is **connected** if there is a path between every pair of vertices. If a graph is not connected, it is **disconnected** and consists of two or more **connected components**.

## 4\. Cyclic vs. Acyclic Graphs

### Cyclic Graphs

A graph that contains at least one **cycle**, which is a path that starts and ends at the same vertex and includes at least three vertices.

### Acyclic Graphs

A graph with no cycles.

* **Trees:** Any undirected, connected, acyclic graph is called a **Tree**.  
* **Directed Acyclic Graphs (DAGs):** A directed graph with no cycles. DAGs are crucial in fields like dependency resolution, compilation, and scheduling.

## 5\. Complete Graphs

A complete graph is a simple undirected graph where every distinct pair of vertices is connected by a unique edge. A complete graph with n vertices is denoted as K\_n and has n\*(n-1)/2 edges.

## 6\. Bipartite Graphs

A graph whose vertices can be divided into two disjoint and independent sets, U and V, such that every edge connects a vertex in U to one in V. No edges exist within U or within V.

* **Application:** Matching problems, such as assigning jobs to workers. For more details, refer to the supporting documentation:

Class 7.1.2:
Title: Graph Traversal Algorithms
Description: Master Breadth-First Search (BFS) and Depth-First Search (DFS) for graph traversal.
Content Type: text
Duration: 660
Order: 2
Text Content:


# Traversal in Graphs

Traversal is the systematic process of visiting every vertex in a graph. The two primary methods are Breadth-First Search (BFS) and Depth-First Search (DFS).

## 1\. Breadth-First Search (BFS) 

BFS explores the graph layer by layer, finding all neighbors at the current level before moving to the next. It uses a **Queue**.

**Algorithm Outline:**

1. Start at the source node and enqueue it.  
2. While the queue is not empty:  
   a. Dequeue a vertex and visit it.  
   b. Enqueue all its unvisited neighbors.

**Example:**  
Consider a graph with nodes A, B, C, D, E and edges (A, B), (A, C), (B, D), (C, E). Starting from A:

| Step | Queue | Visited Order |
| :---- | :---- | :---- |
| 1 | \[A\] | \- |
| 2 | \[B, C\] | A |
| 3 | \[C, D\] | A, B |
| 4 | \[D, E\] | A, B, C |
| 5 | \[E\] | A, B, C, D |
| 6 | \[\] | A, B, C, D, E |

**BFS Traversal Order: A, B, C, D, E**

## 2\. Depth-First Search (DFS) 

DFS explores as far as possible along a single branch before backtracking. It naturally uses a **Stack** or **Recursion**.

**Algorithm Outline:**

1. Start at the source node and process it.  
2. Recursively call DFS on an unvisited neighbor.

**Example (Same Graph):**  
Starting from A, exploring neighbors in the order B then C:

| Step | Action | Visited Order |
| :---- | :---- | :---- |
| 1 | Visit A | A |
| 2 | Visit B (A's neighbor) | A, B |
| 3 | Visit D (B's neighbor) | A, B, D |
| 4 | Backtrack to B, then A. Visit C (A's other neighbor) | A, B, D, C |
| 5 | Visit E (C's neighbor) | A, B, D, C, E |

**DFS Traversal Order: A, B, D, C, E**

# Essential Graph Algorithms 

These algorithms solve critical problems like finding the cheapest connections or sequencing tasks.

## 1\. Prim's Algorithm (Minimum Spanning Tree)

**Goal:** Find a **Minimum Spanning Tree (MST)** for a connected, weighted, undirected graph. The MST connects all vertices with the **minimum total edge weight** and contains no cycles.  
**Approach:** A **greedy** algorithm that grows a single tree from a starting vertex, always adding the minimum-weight edge that connects a vertex in the tree to a vertex outside the tree.

## 2\. Dijkstra's Algorithm (Shortest Path) 

**Goal:** Find the shortest path from a single source vertex to all other vertices in a **non-negative weighted graph**.  
**Key Idea:** It iteratively relaxes edges, updating the shortest known distance to a neighbor if a shorter path is found. It is the basis for many GPS and network routing systems.

## 3\. Kahn's Algorithm (Topological Sorting)

**Goal:** Create a linear ordering of vertices in a **Directed Acyclic Graph (DAG)** such that for every directed edge u to v, vertex u comes before v.  
**Steps:**

1. Compute the **in-degree** (number of incoming edges) for all vertices.  
2. Enqueue all vertices with an in-degree of 0\.  
3. Dequeue a vertex, add it to the order, and decrement the in-degree of all its neighbors. Enqueue neighbors whose in-degree becomes 0\.

**Example of In-degrees:**  
| Vertex | Initial In-degree |  
|---|---|  
| Person | 0 |  
| Person | 1 |  
| Person | 1 |

# Common Pitfalls and Edge Cases 

| Pitfall/Edge Case | Description | Mitigation Strategy |
| :---- | :---- | :---- |
| **Disconnected Graph** | Traversal only visits the starting component. | Iterate through all vertices and restart traversal on any unvisited node. |
| **Cycles** | Traversal algorithms (DFS/BFS) can lead to infinite loops. | Use a **visited** set or array to track and skip already processed nodes. |
| **Negative Edge Weights** | Dijkstra's algorithm fails to find the correct shortest path. | Use the **Bellman-Ford algorithm**, which can handle negative weights (but not negative cycles). |
| **DAG Check Failure** | Topological sort attempts on a cyclic graph. | Check if the total number of sorted vertices equals the total number of vertices in the graph. |

# Famous Graph Interview Questions 

| Question | Core Concept |
| :---- | :---- |
| **Number of Islands** | Finding connected components in a 2D grid using BFS/DFS. |
| **Course Schedule** | Checking for cycles/performing topological sort on a dependency graph. |
| **Clone Graph** | Creating a deep copy of a graph structure (using BFS or DFS). |
| **Detect Cycle in an Undirected Graph** | DFS with a **parent** parameter to distinguish between a back edge and a traversal path. |
| **Cheapest Flights Within K Stops** | A variation of BFS/Dijkstra's, often involving a maximum constraint. |
| **Word Ladder** | BFS to find the shortest path between two words by changing one letter at a time. |

Class 7.1.3:
  Title: Graph Algorithms
  Description: Graph Algorithms
  Content Type: contest
  Duration: 900
  Order: 2
  Contest URL: https://www.scaler.com/test/a/Graphs
  Contest Questions: 4
  Contest Syllabus: 
Graph & its traversal
Prims Algorithm
Djikstra Algorithm
Topological Sorting



