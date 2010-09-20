"use strict";
/*global equals, expect, module, ok, same, start, stop, test */
/*global action, array */

var result;

test("window:", function () {
    expect(6);

    same(action.search(array, "window:"), []);

    same(action.search(array, "window:1"), [
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
            title: "Arch Linux Forums / How to edit video files (mp4, avi ...) meta data (Title, author ...) ?",
            url: "http://bbs.archlinux.org/viewtopic.php?id=43048"
        }}
    ]);

    same(action.search(array, "window:11"), []);

    same(action.search(array, "window:wi"), [
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);

    same(action.search(array, "window:win"), [
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);

    same(action.search(array, "window:wIk"), [
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
});


test("window: (AND)", function () {
    expect(3);

    same(action.search(array, "window:wik x86"), [
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

    same(action.search(array, "x86 window:wik"), [
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

    same(action.search(array, "x86 window:wik x86"), [
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
});


test("window: (-)", function () {
    expect(4);

    same(action.search(array, "-window:wik"), [
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

    same(action.search(array, "-window:wi"), [
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
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
        }},
        { tab: {
            title: "Arch Linux Forums / How to edit video files (mp4, avi ...) meta data (Title, author ...) ?",
            url: "http://bbs.archlinux.org/viewtopic.php?id=43048"
        }}
    ]);

    same(action.search(array, "-window:wi,1"), [
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
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
        }}
    ]);

    same(action.search(array, "-window:wi,1-5,10"), []);
});


test("window: (quotes)", function () {
    expect(11);

    same(action.search(array, 'window:"1"'), [
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
        }}
    ]);

    same(action.search(array, 'window:"wi"'), []);
    same(action.search(array, 'window:"Wikipedi"'), []);
    same(action.search(array, 'window:"Wikipediaf"'), []);
    same(action.search(array, 'window:"Wikipedia"'), [
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

    same(action.search(array, 'window:"Wine"'), []);
    same(action.search(array, 'window:"Wine HQ"'), [
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);

    same(action.search(array, 'window:"Wikipedia","Wine HQ"'), [
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);

    same(action.search(array, 'window:"Wine HQ"-"Wikipedia"'), [
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);

    same(action.search(array, 'wine window:"Wine HQ"-"Wikipedia" 3d'), [
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }}
    ]);

    same(action.search(array, 'window:"1",3-"Wikipedia","5"'), [
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
            title: "Video - MDC",
            url: "https://developer.mozilla.org/En/HTML/Element/Video"
        }},
        { tab: {
            title: "-moz-box-align - MDC",
            url: "https://developer.mozilla.org/en/CSS/-moz-box-align"
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
        }}
    ]);
});


test("window: (dash)", function () {
    expect(19);

    same(action.search(array, "window:-"), []);
    same(action.search(array, "window:-5"), []);

    result = [
        { tab: {
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
        }}
    ];
    same(action.search(array, "window:5-"), result);
    same(action.search(array, "window:5- "), result);

    same(action.search(array, "window:2- video"), [
        { tab: {
            title: "I HEART VIDEO",
            url: "http://iheartvideo.appspot.com/"
        }}
    ]);

    same(action.search(array, "window:5-5"), []);
    same(action.search(array, "window:10-10"), []);

    same(action.search(array, "window:1-10"), array);
    same(action.search(array, "window:10-1"), array);

    same(action.search(array, "window:1-11"), []);
    same(action.search(array, "window:11-1"), []);

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
            title: "Video - MDC",
            url: "https://developer.mozilla.org/En/HTML/Element/Video"
        }},
        { tab: {
            title: "-moz-box-align - MDC",
            url: "https://developer.mozilla.org/en/CSS/-moz-box-align"
        }}
    ];
    same(action.search(array, "window:1-3"), result);
    same(action.search(array, "window:3-1"), result);

    result = [
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
        }}
    ];
    same(action.search(array, "window:2-3"), result);
    same(action.search(array, "window:3-2"), result);

    result = [
        { tab: {
            title: "Video - MDC",
            url: "https://developer.mozilla.org/En/HTML/Element/Video"
        }},
        { tab: {
            title: "-moz-box-align - MDC",
            url: "https://developer.mozilla.org/en/CSS/-moz-box-align"
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ];
    same(action.search(array, "window:3-win"), result);
    same(action.search(array, "window:win-3"), result);

    result = [
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ];
    same(action.search(array, "window:win-wik"), result);
    same(action.search(array, "window:wik-win"), result);
});


test("window: (comma)", function () {
    expect(7);

    result = [
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ];
    same(action.search(array, "window:,win"), result);
    same(action.search(array, "window:win,"), result);
    same(action.search(array, "window:win, "), result);

    same(action.search(array, "window:win, 3d"), [
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }}
    ]);

    same(action.search(array, "window:WiK,WIn"), [
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);

    same(action.search(array, "window:WiK,WIn,5,1"), [
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
            title: "Arch Linux Forums / How to edit video files (mp4, avi ...) meta data (Title, author ...) ?",
            url: "http://bbs.archlinux.org/viewtopic.php?id=43048"
        }}
    ]);

    same(action.search(array, "window:win,WINE,WiNe"), [
        { tab: {
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
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
            title: "3DDriverIssues - The Official Wine Wiki",
            url: "http://wiki.winehq.org/3DDriverIssues"
        }},
        { tab: {
            title: "256ColorMode - The Official Wine Wiki",
            url: "http://wiki.winehq.org/256ColorMode"
        }}
    ]);
});


test("window: (both)", function () {
    expect(6);

    same(action.search(array, "window:2-3,5"), [
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
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
        }}
    ]);

    same(action.search(array, "window:5,2-3"), [
        { tab: {
            title: "The VideoLAN Forums • View topic - Save playlist using relative path",
            url: "http://forum.videolan.org/viewtopic.php?f=7&t=4658"
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
        }}
    ]);

    same(action.search(array, "window:2-3,wine"), [
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
        }}
    ]);

    result = [
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
        }}
    ];
    same(action.search(array, "window:2-3,2-3"), result);
    same(action.search(array, "window:3-2,2-3"), result);

    same(action.search(array, "window:2-3,2"), [
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
            title: "I HEART VIDEO",
            url: "http://iheartvideo.appspot.com/"
        }},
        { tab: {
            title: "YouTube - Google Chrome Extensions: Extension API Design",
            url: "http://www.youtube.com/watch?v=bmxr75CV36A"
        }}
    ]);
});
