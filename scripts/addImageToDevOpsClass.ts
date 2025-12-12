import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addImageToDevOpsClass() {
  try {
    const classId = 'cmj2m9fba000asg7nuwcxyuln'; // DevOps vs Traditional IT

    // Get current content
    const currentClass = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!currentClass) {
      console.log('Class not found');
      return;
    }

    console.log('Current content:');
    console.log(currentClass.textContent);
    console.log('\n---\n');

    // Add the DevOps toolchain image to the content
    const newContent = `## DevOps vs Traditional IT

DevOps represents a fundamental shift in how software is developed and deployed.

### DevOps Toolchain

![DevOps Toolchain](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Devops-toolchain.svg/1200px-Devops-toolchain.svg.png)

The DevOps toolchain includes various stages from planning to monitoring, creating a continuous cycle of improvement.

### Traditional IT:
- **Siloed teams**: Development and Operations work separately
- **Manual processes**: Deployments are often manual and error-prone
- **Slow releases**: Long release cycles (months or years)
- **Limited collaboration**: Teams work in isolation
- **Reactive approach**: Issues are addressed after they occur

### DevOps Approach:
- **Collaboration**: Dev and Ops work together throughout the entire lifecycle
- **Automation**: CI/CD pipelines automate build, test, and deployment
- **Rapid releases**: Frequent deployments (daily or hourly)
- **Continuous feedback**: Monitoring and logging provide real-time insights
- **Proactive approach**: Issues are prevented through automation and monitoring

### Key Benefits of DevOps:
1. **Faster time to market**: Automated pipelines enable rapid deployment
2. **Improved quality**: Automated testing catches issues early
3. **Better collaboration**: Shared responsibilities and tools
4. **Increased reliability**: Infrastructure as Code ensures consistency
5. **Continuous improvement**: Feedback loops drive ongoing enhancements`;

    // Update the class
    await prisma.class.update({
      where: { id: classId },
      data: {
        textContent: newContent,
      },
    });

    console.log('Updated content with image:');
    console.log(newContent);
    console.log('\n✅ Successfully added DevOps toolchain image to the class!');
    console.log('\nView the class at:');
    console.log(`http://localhost:3000/course/cmj2m9ej40000sg7neshp075o/class/${classId}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addImageToDevOpsClass();
