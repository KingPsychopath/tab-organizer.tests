/*global action, state */

action.search = (function () {
    //! var state = {};
    /*! function removeParentheses(string) {
        return Object(/^\((\S+)\)$/.exec(string))[1];
    }*/
    function defaultSearch(array, match) {
        var regexp = new RegExp(match.escape(), "i");
        return array.filter(function (item) {
            return regexp.test(item.tab.title) || regexp.test(item.tab.url);
        });
    }
    /*! function resetAllTabs(array) {
        array.forEach(function (item) {
            item.tabText.textContent = item.tab.title || item.tab.url;
        });
        delete state.shouldReset;
    }*/
    function findCaller(string, keywords, ignore) {
        for (var i = 1; i <= string.length; i += 1) {
            var slice = string.slice(0, i);
            if (ignore) {
                var test = ignore.some(function (item) {
                    return item === slice;
                });
                if (test) {
                    return function (array) {
                        return [];
                    };
                }
            }
            var action = keywords[slice];
            if (typeof action === "function") {
                var match = string.slice(i);
                return function (array) {
                    var result = action(array, match, ignore);
                    if (result !== null) {
                        return result;
                    } else {
                        return defaultSearch(array, string);
                    }
                };
            }
        }
        return function (array) {
            return defaultSearch(array, string);
        };
    }
//!!!!!!
//!!!!!!
    var keywords = {
        /*! "\"": function (array, match) {
            if ((match = /([^"]+)"/.exec(match))) {
                return defaultSearch(array, match[1].replace(/\\(\s+)/g, "$1"));
            }
            return array;
        },*/
        "-": function (array, match, ignore) {
            if (!match) { return null; }
            var normal = findCaller(match, keywords, ignore)(array);
            return array.filter(function (item) {
                return normal.indexOf(item) === -1;
            });
        },
        "r/": function (array, match) {
            match = /((?:[^\/\\]|\\[\s\S])+)\/([i]{0,1})$/.exec(match);
            if (!match) { return null; }
            var regexp = new RegExp(match[1], match[2]);
            return array.filter(function (item) {
                return regexp.test(item.tab.title) || regexp.test(item.tab.url);
            });
        },
        "has:": (function () {
            var queries = {
                "macro": function (array) {
                    var macros = [];
                    var info = {
                        ignore: ["has:macro"]
                    };
                    state.macros.forEach(function (item) {
                        macros = macros.concat(action.search(array, item.search, info));
                    });
                    array = array.filter(function (item) {
                        return macros.indexOf(item) !== -1;
                    });
                    return array;
                }
            };
            return function (array, match) {
                if (!match) { return null; }
                var output = [];
                match.split(/,/).forEach(function (name) {
                    if (queries[name]) {
                        output = output.concat(queries[name](array));
                    }
                });
                return output;
            };
        }()),
        "is:": (function () {
            var queries = {
                "bookmarked": function (array) {
                    return array.filter(function (item) {
                        return state.bookmarksByURL[item.tab.url] > 0;
                    });
                },
                "favorited": function (array) {
                    return array.filter(function (item) {
                        return item.hasAttribute("data-favorited");
                    });
                },
                "image": function (array) {
                    //! var url = /\.(bmp|gif|jpe?g|mng|a?png|raw|tga|tiff?)(?=\?|$)/i;
                    var title = /\(\d+×\d+\)$/;
                    var url = /\.\w+(?=\?|$)/;
                    return array.filter(function (item) {
                        return url.test(item.tab.url) && title.test(item.tab.title);
                    });
                },
                "pinned": function (array) {
                    return array.filter(function (item) {
                        return item.tab.pinned;
                    });
                },
                "selected": function (array) {
                    return array.filter(function (item) {
                        return item.hasAttribute("data-selected");
                    });
                }
            };
            return function (array, match) {
                if (!match) { return null; }
                var output = [];
                match.split(/,/).forEach(function (name) {
                    if (queries[name]) {
                        output = output.concat(queries[name](array));
                    }
                });
                return output;
            };
        }()),
        /*! "is:vector": function (array, match) {
            if (match) { return null; }
            var regexp = /\.(odg|pdf|svg|swf|vml)(?=\?|$)/i;
            return array.filter(function (item) {
                return regexp.test(item.tab.url);
            });
        },*/
        "inurl:": (function () {
            function filter(array, match) {
                var regexp = new RegExp(match.escape(), "i");
                return array.filter(function (item) {
                    return regexp.test(item.tab.url);
                });
            }
            return function (array, match) {
                if (!match) { return null; }
                var output = [];
                match.split(/,/).forEach(function (match) {
                    output = output.concat(filter(array, match));
                });
                return output;
            };
        }()),
        "intitle:": (function () {
            function filter(array, match) {
                var regexp = new RegExp(match.escape(), "i");
                return array.filter(function (item) {
                    return regexp.test(item.tab.title);
                });
            }
            return function (array, match) {
                if (!match) { return null; }
                var output = [];
                match.split(/,/).forEach(function (match) {
                    output = output.concat(filter(array, match));
                });
                return output;
            };
        }()),
        /*! "bookmark:": function (array, match) {
            var bookmarks = Platform.bookmarks.search(match, function (matches) {
                console.log(matches);
            });
            return array;
            return array.filter(function (item) {
                return regexp.test(item.tab.title);
            });
        },*/
        "same:": (function () {
            var queries = {
                "url": function (array) {
                    var data = {};
                    var regexp = /^([^#]+?)\/?(#.*)?$/;
                    array.forEach(function (item) {
                        var url = regexp.exec(item.tab.url)[1];
                        data[url] = data[url] + 1 || 1;
                    });
                    return array.filter(function (item) {
                        var url = regexp.exec(item.tab.url)[1];
                        return data[url] > 1;
                    });
                },
                "title": function (array) {
                    var data = {};
                    array.forEach(function (item) {
                        data[item.tab.title] = data[item.tab.title] + 1 || 1;
                    });
                    return array.filter(function (item) {
                        return data[item.tab.title] > 1;
                    });
                },
                "domain": function (array) {
                    var data = {};
                    var regexp = /^[^:]+:\/\/([^\/]*)/;
                    array.forEach(function (item) {
                        var url = regexp.exec(item.tab.url)[1];
                        data[url] = data[url] + 1 || 1;
                    });
                    return array.filter(function (item) {
                        var url = regexp.exec(item.tab.url)[1];
                        return data[url] > 1;
                    });
                }
            };
            return function (array, match) {
                if (!match) { return null; }
                var output = [];
                match.split(/,/).forEach(function (name) {
                    if (queries[name]) {
                        output = output.concat(queries[name](array));
                    }
                });
                return output;
            };
        }()),
        /*! "is:crashed": function (array, match) {
            if (match) { return null; }
        },*/
        "window:": function (array, match) {
            if (!match) { return null; }
            array = match.split(/,/).map(function (match) {
                //! match = removeParentheses(match);
                var items, split = match.split(/\-/);
                if (split[0]) {
                    var min = new RegExp("^" + split[0].escape(), "i");
                    if (split[1]) {
                        var max = new RegExp("^" + split[1].escape(), "i");
                        var focused =
                            (split[0] === "focused") ||
                            (split[1] === "focused");
                        items = state.list.range(function (item) {
                            var name = item.tabIcon.indexText.value;
                            if (focused && item.hasAttribute("data-focused")) {
                                return true;
                            } else if (min && min.test(name)) {
                                min = null;
                                return true;
                            } else if (max && max.test(name)) {
                                max = null;
                                return true;
                            }
                        });
                    } else if (split[0] === "focused") {
                        items = state.list.filter(function (item) {
                            return item.hasAttribute("data-focused");
                        });
                    } else {
                        items = state.list.filter(function (item) {
                            return min.test(item.tabIcon.indexText.value);
                        });
                    }
                } else {
                    return [];
                }
                var tabs = items.map(function (item) {
                    item = Array.slice(item.tabList.children);
                    return item.filter(function (item) {
                        return array.indexOf(item) !== -1;
                    });
                });
                return tabs.concat.apply([], tabs);
            });
            return array.concat.apply([], array);
        }/*! ,
        "show:url": function (array, match) {
            if (!match) {
                array.forEach(function (item) {
                    item.tabText.textContent = item.tab.url;
                });
                state.shouldReset = true;
            }
            return array;
        }*/
    };
    /*!
    "foo OR bar" OR qux corge
        >    <  >    < > <
        > <> <         > <
                >    < > <
    ("foo OR bar") OR ("qux" AND "corge")
    ["foo OR bar", " OR qux corge"]
    ["", "qux corge"]
    ["qux", "corge"]
    name | name name
    (name OR (name AND name))
    (name | name) name
    ((name OR name) AND name)
    name: {
        OR: {
            name: {
                AND: {
                    name
                }
            }
        }
    }
    "foo OR bar" qux
        >    <  > <
        > <> <  > <
                > <
    ("foo OR bar" AND qux)
    ["foo OR bar", " qux"]
    ["", "qux"]
    */
    //! console.log(lexer);
/*!
    goo OR vid
    array = array;
    array = array(goo)
    OR
    array = array + array(vid)
    goo vid
    array = array;
    array = array(goo)
    AND
    array = array(vid)
    goo vid OR foo
    array(goo, [vid, foo])
    [[goo, vid], [foo]]
    [[goo], [vid, foo]]
    array = array;
    array = array(goo)
    AND
    array = array(vid)
    OR
    array = array + array(foo)
*/
//!!!!!!
//!!!!!!
    return function (array, string, info) {
        //! console.log("-------");
        /*! string = string.replace(/"(?:[^"\n\\]|\\[\s\S])*"/g, function (str) {
            return str.replace(/\s+/g, "\\$&");
        });*/
        info = Object(info);
        var tokens = [];
        string.split(/"((?:[^"\n\\]|\\[\s\S])*)"/).forEach(function (string) {
            string.split(/\s+(?:\||OR)\s+/).forEach(function (string) {
                tokens.push(string.split(/\s+/));
            });
        });
        //! console.log(tokens);
        var tabs = [];
        tokens.forEach(function (item) {
            var scope = array.slice();
            item.forEach(function (key) {
                scope = findCaller(key, keywords, info.ignore)(scope);
            });
            tabs = tabs.concat(scope);
        });
        return tabs;
    };
}());
