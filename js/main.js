// الموقع المتعدد المجالات - ملف الجافاسكريبت الرئيسي
// Author: MiniMax Agent

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع الوظائف
    initMobileMenu();
    initSearch();
    initArticleTabs();
    initNewsletterForm();
    initSmoothScroll();
    initAnimations();
});

// =======================
// القائمة الجانبية للجوال
// =======================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // إغلاق القائمة عند النقر خارجها
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });

        // إغلاق القائمة عند النقر على رابط
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // إغلاق القائمة عند الضغط على Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =======================
// وظيفة البحث
// =======================
function initSearch() {
    const searchInput = document.getElementById('main-search');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        // البحث عند الضغط على زر البحث
        searchBtn.addEventListener('click', performSearch);

        // البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // اقتراحات البحث (يمكنك تطويرها)
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 3) {
                // يمكن إضافة اقتراحات بحث هنا
                console.log('جاري البحث عن: ' + query);
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // يمكن تطوير وظيفة البحث هنا
            alert('جاري البحث عن: ' + query + '\n\nفي موقع حقيقي، سيتم توجيهك لصفحة نتائج البحث.');
            // window.location.href = 'pages/search.html?q=' + encodeURIComponent(query);
        } else {
            searchInput.focus();
            searchInput.placeholder = 'الرجاء إدخال كلمة البحث...';
        }
    }
}

// =======================
// تبويبات المقالات
// =======================
function initArticleTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const articleCards = document.querySelectorAll('.article-card');

    if (tabBtns.length > 0 && articleCards.length > 0) {
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');

                // إزالة الفئة النشطة من جميع الأزرار
                tabBtns.forEach(function(b) {
                    b.classList.remove('active');
                });

                // إضافة الفئة النشطة للزر الحالي
                this.classList.add('active');

                // تصفية المقالات
                articleCards.forEach(function(card) {
                    const category = card.getAttribute('data-category');

                    if (tabId === 'all' || category === tabId) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// =======================
// نموذج النشرة البريدية
// =======================
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value.trim();

            if (validateEmail(email)) {
                // في موقع حقيقي، سيتم إرسال البيانات للخادم
                alert('شكراً لاشتراكك في النشرة البريدية!\n\nسيتم إرسال أحدث المقالات إلى بريدك: ' + email);
                this.reset();
            } else {
                alert('الرجاء إدخال بريد إلكتروني صحيح');
            }
        });
    }
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// =======================
// التمرير السلس
// =======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// =======================
// تأثيرات الحركة
// =======================
function initAnimations() {
    // إضافة تأثير fade-in للعناصر عند التمرير
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // تطبيق التأثير على البطاقات
    var animateElements = document.querySelectorAll('.category-card, .article-card, .tool-card');
    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =======================
// الآلة الحاسبة
// =======================
var calcDisplay = '';
var calcExpression = '';

function openCalculator() {
    var modal = document.getElementById('calculator-modal');
    if (modal) {
        modal.classList.add('active');
        calcDisplay = '';
        calcExpression = '';
        updateCalcDisplay();
    }
}

function closeCalculator() {
    var modal = document.getElementById('calculator-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function updateCalcDisplay() {
    var display = document.getElementById('calc-display');
    if (display) {
        display.value = calcDisplay || '0';
    }
}

function calcNum(num) {
    calcDisplay += num;
    calcExpression += num;
    updateCalcDisplay();
}

function calcOp(op) {
    calcDisplay += ' ' + op + ' ';
    calcExpression += op;
    updateCalcDisplay();
}

function clearCalc() {
    calcDisplay = '';
    calcExpression = '';
    updateCalcDisplay();
}

function deleteCalc() {
    if (calcDisplay.length > 0) {
        // حذف المسافات مع الرقم
        var parts = calcDisplay.trim().split(' ');
        if (parts.length > 1) {
            parts.pop();
            calcDisplay = parts.join(' ');
        } else {
            calcDisplay = calcDisplay.slice(0, -1);
        }

        // تحديث التعبير
        calcExpression = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/\s/g, '');

        // إزالة المسافات من التعبير
        var cleanParts = calcExpression.split(/[\+\-\*\/]/);
        var lastNum = cleanParts[cleanParts.length - 1];
        if (lastNum === '') {
            calcExpression = calcExpression.slice(0, -1);
        }

        updateCalcDisplay();
    }
}

function calcPercent() {
    try {
        var result = eval(calcExpression);
        if (!isNaN(result) && isFinite(result)) {
            var percent = result / 100;
            calcDisplay = percent.toString();
            calcExpression = percent.toString();
            updateCalcDisplay();
        }
    } catch (e) {
        calcDisplay = 'خطأ';
        calcExpression = '';
        updateCalcDisplay();
        setTimeout(clearCalc, 1500);
    }
}

function calcEqual() {
    try {
        // تحويل الرموز للغة الإنجليزية
        var expr = calcExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        var result = eval(expr);
        if (!isNaN(result) && isFinite(result)) {
            // تقريب النتائج الطويلة
            if (result % 1 !== 0) {
                result = Math.round(result * 100000000) / 100000000;
            }
            calcDisplay = result.toString();
            calcExpression = result.toString();
        } else {
            calcDisplay = 'خطأ';
            calcExpression = '';
        }
        updateCalcDisplay();
    } catch (e) {
        calcDisplay = 'خطأ';
        calcExpression = '';
        updateCalcDisplay();
        setTimeout(clearCalc, 1500);
    }
}

// =======================
// عداد الأيام
// =======================
var eventDateValue = '';

function openDaysCounter() {
    var modal = document.getElementById('days-modal');
    if (modal) {
        modal.classList.add('active');
        // تعيين التاريخ الافتراضي ليوم غد
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var dateInput = document.getElementById('event-date');
        if (dateInput && !dateInput.value) {
            dateInput.value = tomorrow.toISOString().split('T')[0];
        }
    }
}

function closeDaysCounter() {
    var modal = document.getElementById('days-modal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('days-result').innerHTML = '';
    }
}

function calculateDays() {
    var dateInput = document.getElementById('event-date');
    var nameInput = document.getElementById('event-name');
    var resultDiv = document.getElementById('days-result');

    if (dateInput && dateInput.value) {
        var eventDate = new Date(dateInput.value + 'T00:00:00');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);

        var timeDiff = eventDate.getTime() - today.getTime();
        var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        var eventName = nameInput && nameInput.value ? nameInput.value : 'المناسبة';

        var message = '';
        var daysText = '';

        if (daysLeft > 0) {
            daysText = 'متبقية';
            message = '<strong style="color: #10b981;">' + daysLeft + '</strong> يوم ' + daysText + ' حتى ' + eventName;
        } else if (daysLeft === 0) {
            message = '🎉 <strong style="color: #f59e0b;">اليوم هو يوم ' + eventName + '!</strong>';
        } else {
            daysText = 'مضت';
            message = '<strong style="color: #ef4444;">' + Math.abs(daysLeft) + '</strong> يوم ' + daysText + ' منذ ' + eventName;
        }

        resultDiv.innerHTML = message;
    } else {
        resultDiv.innerHTML = '<span style="color: #ef4444;">الرجاء تحديد تاريخ المناسبة</span>';
    }
}

// =======================
// مؤشر كتلة الجسم
// =======================
function openBMICalculator() {
    var modal = document.getElementById('bmi-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeBMICalculator() {
    var modal = document.getElementById('bmi-modal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('bmi-result').innerHTML = '';
    }
}

function calculateBMI() {
    var heightInput = document.getElementById('height');
    var weightInput = document.getElementById('weight');
    var resultDiv = document.getElementById('bmi-result');

    var height = parseFloat(heightInput.value);
    var weight = parseFloat(weightInput.value);

    if (height && weight && height > 0 && weight > 0) {
        // تحويل الطول من سم إلى متر
        var heightInMeters = height / 100;
        // حساب مؤشر كتلة الجسم
        var bmi = weight / (heightInMeters * heightInMeters);
        bmi = Math.round(bmi * 10) / 10;

        // تحديد الحالة
        var status = '';
        var color = '';

        if (bmi < 18.5) {
            status = 'نقص في الوزن';
            color = '#f59e0b';
        } else if (bmi < 25) {
            status = 'وزن طبيعي';
            color = '#10b981';
        } else if (bmi < 30) {
            status = 'زيادة في الوزن';
            color = '#f59e0b';
        } else {
            status = 'سمنة';
            color = '#ef4444';
        }

        resultDiv.innerHTML = '<div class="bmi-value">' + bmi + '</div>' +
                             '<div class="bmi-status" style="color: ' + color + ';">' + status + '</div>' +
                             '<p style="margin-top: 10px; font-size: 0.9rem; color: #64748b;">' +
                             'الوزن الصحي للطول ' + height + ' سم يتراوح بين ' +
                             Math.round(18.5 * heightInMeters * heightInMeters) + ' و' +
                             Math.round(24.9 * heightInMeters * heightInMeters) + ' كجم</p>';
    } else {
        resultDiv.innerHTML = '<span style="color: #ef4444;">الرجاء إدخال قيم صحيحة للطول والوزن</span>';
    }
}

// =======================
// عداد التسبيح
// =======================
var tasbihCount = 0;

function openTasbih() {
    var modal = document.getElementById('tasbih-modal');
    if (modal) {
        modal.classList.add('active');
        tasbihCount = 0;
        updateTasbihDisplay();
    }
}

function closeTasbih() {
    var modal = document.getElementById('tasbih-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function incrementTasbih() {
    tasbihCount++;
    updateTasbihDisplay();

    // تأثير اهتزاز خفيف
    var display = document.getElementById('tasbih-count');
    if (display) {
        display.style.transform = 'scale(1.1)';
        setTimeout(function() {
            display.style.transform = 'scale(1)';
        }, 100);
    }

    // إعادة تعيين تلقائي بعد 99
    if (tasbihCount > 99) {
        tasbihCount = 0;
        setTimeout(updateTasbihDisplay, 300);
    }
}

function resetTasbih() {
    tasbihCount = 0;
    updateTasbihDisplay();
}

function updateTasbihDisplay() {
    var display = document.getElementById('tasbih-count');
    if (display) {
        display.textContent = tasbihCount;
    }
}

// =======================
// النوافذ المنبثقة - إغلاق عند النقر خارجها
// =======================
document.addEventListener('click', function(e) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// =======================
// لوحة المفاتيح - التنقل بين النوافذ
// =======================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var modals = document.querySelectorAll('.modal');
        modals.forEach(function(modal) {
            modal.classList.remove('active');
        });
    }
});

// =======================
// الوظائف المساعدة
// =======================

// دالة لتنسيق التاريخ
function formatDate(date) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
}

// دالة لتوليد رقم عشوائي
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// دالة لتأخير التنفيذ
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// =======================
// تحميل البيانات (محاكاة)
// =======================
function loadContent() {
    // يمكن إضافة كود لتحميل المحتوى ديناميكياً من ملف JSON
    console.log('جاري تحميل المحتوى...');
}

// =======================
// تتبع المستخدم (محاكاة)
// =======================
function trackUserActivity() {
    var scrollDepth = 0;
    var maxScroll = 0;

    window.addEventListener('scroll', debounce(function() {
        scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScroll) {
            maxScroll = scrollDepth;
            console.log('عمق التمرير: ' + maxScroll + '%');
        }
    }, 200));
}

// تهيئة تتبع النشاط
trackUserActivity();

// =======================
// إشعارات المتصفح (محاكاة - للتجربة فقط)
// =======================
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body: body });
    }
}

// طلب إذن الإشعارات (اختياري)
// Notification.requestPermission();

// =======================
// نهاية الملف
// =======================
console.log('تم تحميل ملف الجافاسكريبت بنجاح');
