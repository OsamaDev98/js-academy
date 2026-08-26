export const backendNextLessons = [
  {
    slug: 'backend-security-basics',
    category: 'Security',
    title: 'Backend Security Fundamentals',
    summary: 'قواعد أساسية لحماية API قبل التفكير في الإنتاج.',
    definition: 'Backend security مجموعة ممارسات تمنع إساءة استخدام API وتسريب البيانات وتنفيذ عمليات غير مصرح بها.',
    terms: [
      ['Least Privilege', 'منح أقل صلاحيات لازمة.'],
      ['Rate Limiting', 'تحديد عدد الطلبات خلال فترة.'],
      ['Secret', 'معلومة حساسة يجب عدم وضعها في source code.'],
      ['SQL Injection', 'إدخال SQL عبر input غير آمن عند بناء الاستعلامات بطريقة خاطئة.'],
      ['CSRF', 'هجوم يستغل جلسة متصفح الضحية لإرسال طلب غير مقصود في سياقات معينة.']
    ],
    code: `// لا تفعل
const sql = "SELECT * FROM users WHERE email = '" + email + "'";

// استخدم ORM أو parameterized queries
await prisma.user.findUnique({ where: { email } });`,
    output: 'ORM أو parameterized query يعامل input كبيانات بدل دمجه مباشرة في SQL.',
    lineByLine: [
      'string concatenation داخل SQL خطير.',
      'ORM يرسل parameter بطريقة مناسبة.',
      'لكن ORM لا يغني عن authorization وvalidation.'
    ],
    realWorld: 'تطبيق حقيقي يحتاج أيضًا HTTPS وsecure cookie settings وsecret management وdependency updates وaudit logs وrate limits.',
    underTheHood: 'Security ليست feature واحدة. هي defense in depth: طبقات متعددة بحيث فشل طبقة لا يعني انهيار النظام بالكامل.',
    pitfalls: [
      'حفظ secrets في Git.',
      'الثقة في frontend validation.',
      'إظهار database errors.',
      'غياب authorization على endpoints الحساسة.',
      'استخدام dependencies قديمة بلا مراجعة.'
    ],
    exercise: 'اكتب checklist قبل إطلاق API إلى production.',
    answer: 'Validate input → authenticate → authorize → parameterized DB access → secure secrets → HTTPS → rate limiting → safe errors/logging → dependency review → backups/monitoring.'
  }
] as const;
