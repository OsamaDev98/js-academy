import type { CurriculumTopic } from './curriculum-next';

export const nodeArchitectureLesson: CurriculumTopic = {
  slug: 'nodejs-architecture',
  category: 'Node.js Fundamentals',
  title: 'Node.js Architecture: من V8 إلى Event Loop وlibuv',
  summary: 'درس عميق يشرح كيف تعمل Node.js من الداخل، وما علاقة V8 وEvent Loop وlibuv والـThread Pool وCore Modules ببعضها.',
  definition: 'Node.js ليست لغة برمجة جديدة؛ هي JavaScript runtime مبنية حول محرك V8 مع طبقات runtime وواجهات native ومكتبات مثل libuv. هذا التصميم يسمح بتشغيل JavaScript خارج المتصفح وبناء تطبيقات شبكية تعتمد بكثرة على عمليات الإدخال والإخراج غير المتزامنة.',
  why: 'فهم المعمارية يمنع أكثر الأخطاء شيوعًا في Node.js: الاعتقاد أن كل شيء يعمل على Thread واحد، أو أن async يعني أن JavaScript نفسها تعمل بالتوازي، أو أن Event Loop مجرد queue واحدة. عندما تفهم المسار الداخلي للطلب ستعرف لماذا بعض العمليات سريعة تحت الحمل ولماذا قد يؤدي عمل CPU ثقيل إلى تجميد التطبيق.',
  terms: [
    ['Runtime', 'البيئة التي توفر لمحرك JavaScript APIs وآليات تنفيذ خارج اللغة نفسها.'],
    ['V8', 'محرك JavaScript من Google يحلل وينفذ JavaScript ويحوّل أجزاء منها إلى machine code أثناء التشغيل.'],
    ['Call Stack', 'المكدس الذي يتتبع استدعاءات الدوال JavaScript أثناء التنفيذ المتزامن.'],
    ['Event Loop', 'آلية تنسيق تسمح للـruntime بمعالجة العمل غير المتزامن وإعادة callbacks إلى سياق JavaScript عندما تصبح جاهزة.'],
    ['libuv', 'مكتبة متعددة المنصات توفر event loop وآليات asynchronous I/O وتستخدم thread pool لبعض الأعمال.'],
    ['Thread Pool', 'مجموعة خيوط تستخدمها libuv لبعض العمليات التي لا يمكن تنفيذها عبر واجهات non-blocking مباشرة، بحسب نوع العملية والمنصة.'],
    ['Non-blocking I/O', 'أسلوب يبدأ عملية I/O دون إبقاء تنفيذ JavaScript متوقفًا حتى تنتهي العملية.'],
    ['Core Modules', 'وحدات توفرها Node.js مثل fs وhttp وevents وstream وbuffer وcrypto.']
  ],
  code: `console.log('1: start');

setTimeout(() => {
  console.log('4: timer callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3: promise microtask');
});

console.log('2: end');`,
  output: `1: start
2: end
3: promise microtask
4: timer callback`,
  lineByLine: [
    'يبدأ تنفيذ الملف على Call Stack، لذلك تظهر start أولًا.',
    'setTimeout يسجل timer ولا يجعل JavaScript تنتظر انتهاءه.',
    'Promise.then يضع microtask ليتم التعامل معها بعد انتهاء الـcurrent JavaScript turn وفق قواعد runtime.',
    'end تنفذ قبل رجوع التحكم لمعالجة الـmicrotasks.',
    'بعد معالجة الـmicrotasks يمكن للـtimer callback أن ينفذ عندما تصبح مرحلة الـtimer مناسبة.'
  ],
  realWorld: 'عند استقبال آلاف طلبات HTTP، لا تحتاج Node.js إلى إنشاء JavaScript thread جديد لكل connection. يبدأ الطلب، وتُسند عمليات I/O إلى النظام أو طبقات runtime المناسبة، ثم يعود التنفيذ إلى Event Loop لمعالجة callbacks الجاهزة. لهذا تناسب Node.js APIs وWebSocket وخدمات I/O كثيفة، بشرط ألا تضع أعمال CPU ثقيلة داخل مسار JavaScript الرئيسي.',
  underTheHood: `عند تشغيل node app.js يبدأ runtime بتهيئة البيئة ثم يستخدم V8 لتنفيذ JavaScript. V8 يدير Call Stack والذاكرة وتنفيذ اللغة. Node.js تضيف APIs مثل fs وhttp وprocess وBuffer وtimers. libuv توفر Event Loop وتتكامل مع آليات نظام التشغيل غير المتزامنة، وتستخدم Thread Pool لبعض العمليات مثل بعض عمليات filesystem وDNS وcrypto بحسب API والمنصة. لذلك عبارة “Node.js single-threaded” تعني أساسًا أن JavaScript application code له main execution thread، وليس أن العملية كلها تحتوي على thread واحد فقط.

Event Loop ليست queue واحدة. لها مراحل وآليات متعددة، كما توجد microtasks وprocess.nextTick التي لها قواعد أولوية خاصة في Node.js. كذلك فإن network I/O قد يعتمد على آليات النظام مباشرة، بينما بعض الأعمال تُنفذ عبر libuv thread pool. هذه التفاصيل مهمة عندما تحلل الأداء أو ترتيب التنفيذ.

Core modules هي APIs رسمية داخل runtime. fs للتعامل مع الملفات، http لبناء خوادم HTTP، events لنموذج EventEmitter، stream للتعامل مع البيانات تدريجيًا، buffer لتمثيل البيانات الثنائية، وcrypto للعمليات والتشفير المرتبطة بـNode.js. لا يصح اختزال كل هذه الوحدات في عبارة “JavaScript تتصل بـC++”؛ التنفيذ الفعلي موزع بين JavaScript وC/C++ وV8 وlibuv ومكتبات النظام الخارجية بحسب الوحدة والعملية.`,
  pitfalls: [
    'القول إن Node.js لا تستخدم إلا Thread واحد؛ الصحيح أن JavaScript execution الأساسي على main thread بينما runtime قد يستخدم threads أخرى.',
    'الاعتقاد أن setTimeout(fn, 0) يعني تنفيذ fn فورًا بعد السطر السابق.',
    'اعتبار Event Loop قائمة انتظار واحدة؛ هناك phases وmicrotasks وآليات أخرى.',
    'وضع loop حسابية ضخمة أو CPU-heavy work داخل main JavaScript thread ثم توقع استمرار الاستجابة طبيعيًا.',
    'الاعتقاد أن كل async operation تستخدم Thread Pool؛ بعض عمليات الشبكة تعتمد على non-blocking OS facilities مباشرة.',
    'اختزال Core Modules كلها في JavaScript فقط أو كلها في C++ فقط.'
  ],
  exercise: `توقع ترتيب الإخراج للكود التالي قبل تشغيله، ثم اشرح السبب:

console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');

بعد ذلك اكتب مثالًا آخر يحتوي على عملية fs غير متزامنة وفسّر أين تدخل عملية I/O في الصورة المعمارية.`,
  answer: `الترتيب المتوقع في المثال الأول: A ثم D ثم C ثم B.

A وD ينفذان أثناء الـcurrent synchronous turn. بعدها تتم معالجة microtask الخاصة بالـPromise، ثم يصل الدور إلى timer عندما تكون مرحلة الـtimers مناسبة.

في مثال fs، استدعاء fs.readFile يبدأ عملية القراءة بشكل غير متزامن، ثم يستطيع JavaScript متابعة تنفيذ تعليمات أخرى. عند اكتمال القراءة تعود النتيجة إلى callback وفق آليات Node.js/libuv والـEvent Loop. لا ينبغي افتراض أن كل تفاصيل القراءة نفسها تنفذ على JavaScript main thread.`
};
