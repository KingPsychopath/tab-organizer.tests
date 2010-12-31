"use strict";
/*global equals, expect, module, ok, same, start, stop, test */
/*global action, array */

test("same:title", function () {
    expect(5);

    same(action.search(array, "same:title"), [
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64"
        }},
        { tab: {
            title: "Vegetarianism - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian#Nutrition"
        }},
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian"
        }},
        { tab: {
            title: "Vegetarianism - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64/"
        }}
    ]);

    same(action.search(array, "x86 same:title"), [
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64"
        }},
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian"
        }},
        { tab: {
            title: "Vegetarianism - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64/"
        }}
    ]);

    same(action.search(array, "intitle:x86 same:title"), [
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64"
        }},
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian"
        }},
    ]);

    same(action.search(array, "same:titlef"), []);
    same(action.search(array, "same:title`"), []);
});


test("same:title (AND)", function () {
    expect(1);

    same(action.search(array, "# same:title"), [
        { tab: {
            title: "Vegetarianism - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian#Nutrition"
        }},
    ]);
});


test("same:title (-)", function () {
    expect(1);

    same(action.search(array, "-same:title"), [
        { tab: {
            title: "Gmail - Inbox (3) - pcxunlimited@gmail.com",
            url: "https://mail.google.com/mail/?shva=1#inbox"
        }},
        { tab: {
            title: "Issue 1316 - chromium - Scroll Wheel to switch tabs? - Project Hosting on Google Code",
            url: "http://code.google.com/p/chromium/issues/detail?id=1316"
        }},
        { tab: {
            title: "Let me google that for you",
            url: "http://lmgtfy.com/"
        }},
        { tab: {
            title: "I HEART VIDEO",
            url: "http://iheartvideo.appspot.com/"
        }},
        { tab: {
            title: "YouTube - Google Chrome Extensions: Extension API Design",
            url: "http://www.youtube.com/watch?v=bmxr75CV36A"
        }},
        { tab: {
            title: "Video - MDC",
            url: "https://developer.mozilla.org/En/HTML/Element/Video"
        }},
        { tab: {
            title: "-moz-box-align - MDC",
            url: "https://developer.mozilla.org/en/CSS/-moz-box-align"
        }},
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }},
        { tab: {
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
        }},
        { tab: {
            title: "Arch Linux Forums / How to edit video files (mp4, avi ...) meta data (Title, author ...) ?",
            url: "http://bbs.archlinux.org/viewtopic.php?id=43048"
        }}
    ]);
});


test("same: (combo)", function () {
    expect(6);

    result = [
        { tab: {
            title: "Gmail - Inbox (3) - pcxunlimited@gmail.com",
            url: "https://mail.google.com/mail/?shva=1#inbox"
        }},
        { tab: {
            title: "Issue 1316 - chromium - Scroll Wheel to switch tabs? - Project Hosting on Google Code",
            url: "http://code.google.com/p/chromium/issues/detail?id=1316"
        }},
        { tab: {
            title: "Let me google that for you",
            url: "http://lmgtfy.com/"
        }},
        { tab: {
            title: "I HEART VIDEO",
            url: "http://iheartvideo.appspot.com/"
        }},
        { tab: {
            title: "YouTube - Google Chrome Extensions: Extension API Design",
            url: "http://www.youtube.com/watch?v=bmxr75CV36A"
        }},
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64"
        }},
        { tab: {
            title: "Vegetarianism - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian#Nutrition"
        }},
        { tab: {
            title: "x86-64 - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/Vegetarian"
        }},
        { tab: {
            title: "Vegetarianism - Wikipedia, the free encyclopedia",
            url: "http://en.wikipedia.org/wiki/X86-64/"
        }},
        { tab: {
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
        }},
        { tab: {
            title: "Arch Linux Forums / How to edit video files (mp4, avi ...) meta data (Title, author ...) ?",
            url: "http://bbs.archlinux.org/viewtopic.php?id=43048"
        }},
    ];
    same(action.search(array, "same:title,-domain"), result);
    // (same: (or (value title) (not (value domain))))

    // ["url", "title", "domain"]
    //n  ("NOT" (false) ("NOT (false)))
    //y  (true (true))
    //y  ("" (false) ("" (true)))

    same(action.search(array, "same:title | same:-domain"), result);
    same(action.search(array, "same:title | -same:domain"), result);
    same(action.search(array, "same:-domain,title"), result);
    // (same: (or (not (value domain)) (value title)))

    // ["url", "title", "domain"]
    //n  ("NOT" ("NOT" (false)))
    //n  ("NOT" ("NOT" (false)))
    //n  (false ("" (true)) (false))

    // ["url", "title", "domain"]
    //n  (false ("NOT" (false)) (false))
    //y  (true ("NOT" (false)) (true))
    //y  ("" ("" (true)))


    // (same: (and (not (value domain)) (value title)))

    // ["url", "title", "domain"]
    //n  (false ("NOT" (false)) (false))
    //n  (false ("NOT" (false)) (true))
    //n  (false ("" (true)))

    // (same: (and (not (value domain)) (value title)))


    // (not domain) title
    // ["url", "title", "domain"]
    //n  ("NOT" (false))
    //n  ("NOT" (false))
    //y  ("" (true))

    //n  (false)
    //y  (true)
    //n  (false)
    same(action.search(array, "same:-domain | same:title"), result);
    same(action.search(array, "-same:domain | same:title"), result);
});
