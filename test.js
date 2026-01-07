const { chromium } = require('playwright');

async function testWebsite() {
    console.log('🚀 بدء اختبار الموقع...\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    let hasErrors = false;
    
    // جمع أخطاء الكونسول
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
    
    // جمع أخطاء الصفحة
    page.on('pageerror', error => {
        consoleErrors.push(error.message);
        hasErrors = true;
    });
    
    const pages = [
        { name: 'الرئيسية', path: '/workspace/multi-domain-website/index.html' },
        { name: 'البرمجة والتقنية', path: '/workspace/multi-domain-website/pages/programming.html' },
        { name: 'الطب والصحة', path: '/workspace/multi-domain-website/pages/health.html' },
        { name: 'الدين والروحانيات', path: '/workspace/multi-domain-website/pages/religion.html' }
    ];
    
    for (const pageInfo of pages) {
        try {
            console.log(`📄 اختبار صفحة: ${pageInfo.name}`);
            await page.goto(`file://${pageInfo.path}`, { waitUntil: 'networkidle' });
            
            // التحقق من وجود العناصر الأساسية
            const title = await page.title();
            console.log(`   ✓ عنوان الصفحة: ${title}`);
            
            const header = await page.$('header.main-header');
            console.log(`   ✓ رأس الصفحة: ${header ? 'موجود' : 'غير موجود'}`);
            
            const main = await page.$('main');
            console.log(`   ✓ القسم الرئيسي: ${main ? 'موجود' : 'غير موجود'}`);
            
            const footer = await page.$('footer.main-footer');
            console.log(`   ✓ تذييل الصفحة: ${footer ? 'موجود' : 'غير موجود'}`);
            
            // التحقق من تحميل ملفات CSS وJS
            const cssLoaded = await page.evaluate(() => {
                const links = document.querySelectorAll('link[rel="stylesheet"]');
                return Array.from(links).every(link => link.sheet);
            });
            console.log(`   ✓ ملفات CSS: ${cssLoaded ? 'تم تحميلها' : 'فشل التحميل'}`);
            
            const jsLoaded = await page.evaluate(() => {
                const scripts = document.querySelectorAll('script[src]');
                return scripts.length > 0;
            });
            console.log(`   ✓ ملفات JS: ${jsLoaded ? 'تم اكتشافها' : 'لم يتم العثور'}`);
            
            console.log('');
            
        } catch (error) {
            console.error(`   ✗ خطأ في صفحة ${pageInfo.name}: ${error.message}`);
            hasErrors = true;
            console.log('');
        }
    }
    
    // اختبار الأداء
    console.log('⚡ اختبار الأداء...');
    await page.goto('file:///workspace/multi-domain-website/index.html', { waitUntil: 'domcontentloaded' });
    const loadTime = await page.evaluate(() => {
        return performance.now();
    });
    console.log(`   ✓ وقت التحميل: ${Math.round(loadTime)}ms`);
    console.log('');
    
    // اختبار التوافق مع الجوال
    console.log('📱 اختبار التوافق مع الجوال...');
    await context.close();
    const mobileContext = await browser.newContext({
        viewport: { width: 375, height: 667 }
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('file:///workspace/multi-domain-website/index.html', { waitUntil: 'networkidle' });
    
    const mobileMenuBtn = await mobilePage.$('.mobile-menu-btn');
    console.log(`   ✓ زر القائمة الجوال: ${mobileMenuBtn ? 'موجود' : 'غير موجود'}`);
    
    const responsiveGrid = await mobilePage.$('.categories-grid');
    console.log(`   ✓ شبكة التصنيفات المتجاوبة: ${responsiveGrid ? 'موجود' : 'غير موجود'}`);
    console.log('');
    
    // عرض أخطاء الكونسول
    if (consoleErrors.length > 0) {
        console.log('⚠️ أخطاء الكونسول المكتشفة:');
        consoleErrors.forEach((error, index) => {
            console.log(`   ${index + 1}. ${error}`);
        });
        console.log('');
    }
    
    await browser.close();
    
    // النتيجة النهائية
    console.log('='.repeat(50));
    if (!hasErrors && consoleErrors.length === 0) {
        console.log('✅ تم اختبار الموقع بنجاح! لا توجد أخطاء.');
    } else if (consoleErrors.length > 0) {
        console.log('⚠️ تم الانتهاء مع بعض التحذيرات.');
    } else {
        console.log('❗ تم اكتشاف أخطاء تحتاج إلى تصحيح.');
    }
    console.log('='.repeat(50));
}

testWebsite().catch(console.error);
