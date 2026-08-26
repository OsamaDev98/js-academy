export type CurriculumTopic = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  definition: string;
  why: string;
  terms: [string,string][];
  code: string;
  output: string;
  lineByLine: string[];
  realWorld: string;
  underTheHood: string;
  pitfalls: string[];
  exercise: string;
  answer: string;
};

export const curriculumNext: CurriculumTopic[] = [
  {
    slug:'rest-api-fundamentals', category:'Backend Architecture', title:'REST API من الصفر إلى الفهم الصحيح',
    summary:'افهم API وREST وresources وHTTP methods وstatus codes قبل استخدام أي framework.',
    definition:'API هي واجهة تسمح لبرنامج بالتواصل مع برنامج آخر. REST أسلوب معماري شائع لبناء Web APIs باستخدام موارد resources وتمثيلها عبر URLs والاستفادة من HTTP methods وstatus codes. REST ليس مكتبة ولا framework ولا يعني أن كل API يجب أن تتبع وصفة واحدة حرفيًا.',
    why:'إذا فهمت REST أولًا، يصبح Express أو Next.js مجرد أدوات لتنفيذ مفاهيم تعرفها بالفعل. أما حفظ routes دون فهم HTTP فيؤدي إلى APIs غير متسقة.',
    terms:[['Resource','كيان أو مورد تتعامل معه API مثل users أو orders.'],['Endpoint','عنوان API يمكن للعميل استدعاؤه.'],['GET','طلب قراءة بيانات.'],['POST','إنشاء مورد أو تنفيذ عملية تعتمد على body.'],['PATCH','تعديل جزئي لمورد.'],['DELETE','حذف مورد.'],['Status Code','رقم يصف نتيجة HTTP request مثل 200 و201 و404 و500.']],
    code:'GET /api/users/42\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "id": 42, "name": "Osama" }',
    output:'العميل يطلب resource محددًا، والخادم يعيد status وheaders وJSON body.',
    lineByLine:['GET يحدد أن العملية قراءة.','/api/users/42 يمثل user resource برقم 42.','200 يعني أن الطلب نجح.','Content-Type يحدد صيغة البيانات.','body يحتوي representation للـresource.'],
    realWorld:'تطبيق React أو Next.js يمكنه استدعاء /api/products ثم عرض المنتجات. تطبيق الهاتف يمكنه استدعاء نفس API إذا كان العقد مصممًا بشكل جيد.',
    underTheHood:'REST يعتمد على HTTP الموجود أصلًا. الخادم لا يحتاج معرفة كيف سيعرض العميل البيانات؛ مهمته استقبال request والتحقق من المدخلات وتنفيذ المنطق وإعادة response واضح.',
    pitfalls:['استخدام POST لكل العمليات.','إرجاع 200 حتى عند وجود resource غير موجود.','وضع بيانات حساسة في URL.','خلط route naming بطريقة غير متسقة.'],
    exercise:'صمم endpoints لمنتج: list، get one، create، update جزئي، delete.',
    answer:'GET /products\nGET /products/:id\nPOST /products\nPATCH /products/:id\nDELETE /products/:id'
  },
  {
    slug:'middleware', category:'Backend Architecture', title:'Middleware: طبقات تمر عبر الطلب',
    summary:'افهم لماذا middleware أساس في Express وأطر backend، وكيف يمكن استخدامها للـlogging وauth وvalidation.',
    definition:'Middleware هي دالة أو طبقة تقع في مسار معالجة request ويمكنها تنفيذ عمل قبل الوصول إلى handler أو بعده، أو رفض الطلب، أو تمرير التحكم للطبقة التالية. في Express غالبًا تستقبل req وres وnext.',
    why:'بدل تكرار authentication وlogging وvalidation في كل route، تضع السلوك المشترك في middleware قابلة لإعادة الاستخدام.',
    terms:[['Request Pipeline','سلسلة الطبقات التي يمر خلالها الطلب.'],['next','دالة تمرر التحكم للـmiddleware التالية في Express-style APIs.'],['Authentication','إثبات هوية المستخدم.'],['Authorization','تحديد ما يسمح للمستخدم بفعله.'],['Validation','التأكد من صحة شكل وقيم المدخلات.']],
    code:'function logger(req, res, next) {\n  console.log(req.method, req.url);\n  next();\n}\n\napp.use(logger);\napp.get("/users", (req, res) => {\n  res.json({ ok: true });\n});',
    output:'GET /users\n{ "ok": true }',
    lineByLine:['middleware تستقبل الطلب.','تسجل method وURL.','next تسمح بمتابعة pipeline.','route handler ينفذ بعد ذلك ويرسل response.'],
    realWorld:'يمكن أن يكون لديك middleware للتحقق من JWT قبل /api/admin، وmiddleware أخرى للـrequest ID والـlogging وrate limiting.',
    underTheHood:'Middleware ليست سحرًا؛ هي composition pipeline. ترتيب التسجيل مهم جدًا: middleware المسجلة قبل route يمكنها التأثير عليها، وإذا لم تستدع next ولم ترسل response فقد يتوقف الطلب.',
    pitfalls:['نسيان next عند الحاجة.','إرسال response ثم استدعاء next بلا داعٍ.','وضع middleware ثقيلة على كل route.','الخلط بين authentication وauthorization.'],
    exercise:'صمم auth middleware تتحقق من وجود Authorization header ثم تسمح للطلب بالمرور، وإلا تعيد 401.',
    answer:'function auth(req,res,next){ if(!req.headers.authorization) return res.status(401).json({error:"Unauthorized"}); next(); }'
  },
  {
    slug:'authentication-authorization', category:'Security', title:'Authentication vs Authorization',
    summary:'الفرق الجوهري بين من أنت وماذا يسمح لك النظام أن تفعل.',
    definition:'Authentication هي عملية إثبات هوية المستخدم، مثل تسجيل الدخول بكلمة مرور أو جلسة. Authorization هي قرار الصلاحيات بعد معرفة الهوية، مثل السماح للـadmin بحذف مستخدم بينما لا يسمح للمستخدم العادي.',
    why:'الخلط بين المصطلحين ينتج ثغرات. وجود userId صحيح لا يعني تلقائيًا أن المستخدم يملك صلاحية تعديل resource معين.',
    terms:[['Identity','هوية الشخص أو الحساب.'],['Session','حالة مصادقة محفوظة للخادم أو مرتبطة بعميل.'],['Credential','معلومة تثبت الهوية مثل password أو token.'],['Role','تصنيف للصلاحيات مثل admin أو user.'],['Permission','صلاحية محددة مثل users:delete.']],
    code:'const user = await authenticate(request);\nif (!user) return new Response("Unauthorized", { status: 401 });\n\nif (!user.permissions.includes("users:delete")) {\n  return new Response("Forbidden", { status: 403 });\n}',
    output:'401 = لم يتم إثبات الهوية.\n403 = الهوية معروفة لكن الصلاحية غير كافية.',
    lineByLine:['authenticate يحاول معرفة هوية المستخدم.','غياب الهوية يؤدي إلى 401.','بعد نجاح authentication نفحص permission.','غياب الصلاحية يؤدي إلى 403.'],
    realWorld:'لوحة admin في مشروع Next.js تحتاج authentication لكل مستخدم مسجل، وauthorization إضافية لمن يريد الوصول إلى إدارة المستخدمين أو الفواتير.',
    underTheHood:'الهوية قد تأتي من cookie session أو bearer token أو OAuth provider. اختيار الطريقة يعتمد على التطبيق، لكن القاعدة ثابتة: لا تعتمد على بيانات يرسلها العميل وحدها لتحديد الصلاحيات.',
    pitfalls:['إخفاء زر admin في الواجهة واعتبار ذلك حماية.','قبول role من request body.','استخدام 403 و401 بلا فهم.','تخزين كلمات المرور كنص صريح.'],
    exercise:'اكتب checklist قصيرة لحماية endpoint DELETE /users/:id.',
    answer:'Authenticate user → verify permission → validate target id → execute delete → audit/log action.'
  },
  {
    slug:'jwt-deep-dive', category:'Security', title:'JWT بعمق: Header وPayload وSignature',
    summary:'افهم ما هو JWT وما الذي يثبته التوقيع وما الذي لا يفعله، ومتى تحتاج إلى session بدلًا منه.',
    definition:'JSON Web Token هو تنسيق token مكوّن عادة من Header وPayload وSignature. Header وPayload يمكن ترميزهما Base64URL وليس المقصود بهما التشفير. Signature تسمح للخادم بالتحقق من أن token لم يتم تعديله وأنه صادر وفق المفتاح/الخوارزمية المتوقعة.',
    why:'JWT منتشر جدًا، لكن من أخطر الأخطاء الاعتقاد أن payload سري أو أن امتلاك token يعني أن كل شيء آمن تلقائيًا.',
    terms:[['Header','معلومات عن نوع token والخوارزمية.'],['Payload','claims مثل sub وexp؛ ليست مكانًا للأسرار.'],['Signature','توقيع يتيح التحقق من سلامة token ومصدره وفق النظام.'],['Claim','معلومة داخل payload.'],['exp','وقت انتهاء صلاحية token عندما تستخدمه آلية التحقق.']],
    code:'const token = "header.payload.signature";\n\n// الفكرة المنطقية:\n// decode header + payload\n// verify signature\n// validate claims مثل exp وiss وaud\n// ثم استخدم identity بحذر',
    output:'Token صالح ← يمكن قبول الهوية وفق قواعد التطبيق.\nToken معدّل/منتهي/غير موثوق ← يرفض.',
    lineByLine:['لا تعتبر decode إثباتًا للصحة.','verification هي الخطوة الأمنية الأساسية.','claims تحتاج validation حسب التطبيق.','بعد التحقق استخدم subject كهوية، ثم طبّق authorization.'],
    realWorld:'يمكن استخدام JWT للوصول إلى API بين خدمات، لكن التطبيقات التي تحتاج session revocation فورية قد تستفيد من sessions أو token rotation/blacklisting حسب التصميم.',
    underTheHood:'الـsignature لا تخفي payload؛ أي طرف يحمل token يمكنه عادة قراءة header وpayload. السرية تحتاج encryption، بينما integrity/authenticity تأتي من signature وفق الخوارزمية والمفتاح.',
    pitfalls:['وضع password أو secret في payload.','قبول token بعد decode دون verify.','تجاهل exp أو issuer/audience عند الحاجة.','وضع token طويل العمر في مكان مكشوف.'],
    exercise:'اذكر ثلاث معلومات لا يجب وضعها في JWT payload حتى لو كان token signed.',
    answer:'passwords، private secrets، وأي بيانات حساسة تعتمد على السرية. التوقيع لا يعني encryption.'
  },
  {
    slug:'validation-zod', category:'Backend Engineering', title:'Validation: لماذا لا تثق في بيانات العميل؟',
    summary:'تعلم مفهوم validation وschema وكيف تحمي API من بيانات ناقصة أو خاطئة قبل دخول business logic.',
    definition:'Validation هي عملية التحقق من أن البيانات القادمة تحقق قواعد الشكل والنوع والقيم التي يتوقعها النظام. Schema تصف هذه القواعد بطريقة يمكن تنفيذها والتحقق منها.',
    why:'TypeScript يحميك أثناء التطوير داخل الكود، لكنه لا يضمن أن JSON القادم من الإنترنت صحيح. عند حدود النظام يجب validation فعلية وقت التشغيل.',
    terms:[['Runtime Validation','فحص فعلي للقيمة أثناء تشغيل البرنامج.'],['Schema','وصف رسمي للبيانات المتوقعة.'],['Parse','تحويل/فحص input وإنتاج قيمة موثوقة أو خطأ.'],['Sanitization','تنظيف أو تطبيع بيانات في حالات محددة.']],
    code:'import { z } from "zod";\n\nconst createUserSchema = z.object({\n  name: z.string().min(2),\n  age: z.number().int().positive(),\n  email: z.string().email()\n});\n\nconst user = createUserSchema.parse(input);',
    output:'Input صالح → user typed/validated value.\nInput خاطئ → ZodError.',
    lineByLine:['schema تحدد العقد المتوقع.','name يجب أن يكون string بطول مناسب.','age يجب أن يكون integer موجبًا.','email يجب أن يطابق صيغة email التي تقبلها Zod.','parse يرفض input المخالف بدل تمريره للـbusiness logic.'],
    realWorld:'في API لتسجيل مستخدم، validation تمنع age:"hello" أو email غير صالح قبل إرسال البيانات إلى database.',
    underTheHood:'Runtime validation تعيد فحص data فعلية في boundary. TypeScript types تختفي بعد compilation، لذلك لا يمكن الاعتماد عليها وحدها مع HTTP request أو database response أو environment variables.',
    pitfalls:['الاعتماد على TypeScript وحده مع input خارجي.','validation للواجهة فقط دون backend.','إرجاع تفاصيل داخلية غير مناسبة في error response.','عدم توحيد schema بين أجزاء التطبيق عند الحاجة.'],
    exercise:'أنشئ schema لمنتج يحتوي name وprice وstock، واجعل price رقمًا غير سالب وstock integer غير سالب.',
    answer:'const productSchema=z.object({name:z.string().min(1),price:z.number().nonnegative(),stock:z.number().int().nonnegative()});'
  },
  {
    slug:'database-postgresql-basics', category:'Database', title:'PostgreSQL: لماذا يحتاج Backend إلى قاعدة بيانات؟',
    summary:'افهم tables وrows وcolumns وprimary keys وrelations قبل الدخول في Prisma.',
    definition:'PostgreSQL نظام إدارة قواعد بيانات علائقية قوي. تخزن البيانات في tables تتكون من rows وcolumns، ويمكن ربط الجداول بعلاقات واستخدام SQL للاستعلام والتعديل.',
    why:'معظم تطبيقات الويب الحقيقية تحتاج بيانات دائمة: users وorders وproducts وpayments. فهم database concepts يمنعك من استخدام ORM كصندوق أسود.',
    terms:[['Table','هيكل منطقي لتخزين نوع من البيانات.'],['Row','سجل واحد داخل table.'],['Column','خاصية لها نوع وقيود.'],['Primary Key','معرف فريد للسجل.'],['Foreign Key','مرجع من table إلى سجل في table أخرى.'],['Index','هيكل يساعد database على تسريع عمليات بحث معينة مقابل تكلفة في التخزين والكتابة.']],
    code:'CREATE TABLE users (\n  id BIGSERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL\n);\n\nSELECT id, name FROM users WHERE email = $1;',
    output:'جدول users بقاعدة بيانات، والاستعلام يعيد id وname للمستخدم الذي يطابق email.',
    lineByLine:['CREATE TABLE ينشئ schema.','PRIMARY KEY يفرض هوية فريدة.','NOT NULL يمنع القيمة المفقودة.','UNIQUE يمنع تكرار email.','$1 parameter يحمي من بناء SQL string بطريقة غير آمنة.'],
    realWorld:'في منصة تعليمية يمكن أن تكون لديك users وcourses وlessons وenrollments. العلاقات تربط الطالب بالكورس والدروس.',
    underTheHood:'Database engine لا تحفظ البيانات كـobjects JavaScript. لديها storage وquery planner وtransactions وlocking/indexes. ORM مثل Prisma يوفر طبقة developer-friendly فوق هذا النظام لكنه لا يلغي قواعد database.',
    pitfalls:['عدم وضع constraints في database عند الحاجة.','الاستعلامات غير المفهرسة على جداول ضخمة.','بناء SQL باستخدام string concatenation من input المستخدم.','عدم فهم transactions عند العمليات المتعددة.'],
    exercise:'صمم جدول courses وجدول enrollments لتمثيل تسجيل users في courses.',
    answer:'courses(id, title). enrollments(id, user_id FK, course_id FK, created_at). ويمكن إضافة UNIQUE(user_id,course_id) لمنع التسجيل المكرر.'
  }
];
