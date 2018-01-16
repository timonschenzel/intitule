module.exports = class Intitule
{
    constructor()
    {
        this.ansiStyles = require('ansi-styles');
        this.concordance = require('concordance');
        this.highlight = require('cli-highlight').highlight;
        this.prettier = require('prettier');
        this.isHtml = require('is-html');
        this.chalk = require('chalk');
        this.forceColor = new this.chalk.constructor({enabled: true});

        this.dumpTheme = {
            boolean: this.ansiStyles.yellow,
            circular: this.forceColor.grey('[Circular]'),
            date: {
                invalid: this.forceColor.red('invalid'),
                value: this.ansiStyles.blue
            },
            diffGutters: {
                actual: this.forceColor.red('-') + ' ',
                expected: this.forceColor.green('+') + ' ',
                padding: '  '
            },
            error: {
                ctor: {open: this.ansiStyles.grey.open + '(', close: ')' + this.ansiStyles.grey.close},
                name: this.ansiStyles.magenta
            },
            function: {
                name: this.ansiStyles.blue,
                stringTag: this.ansiStyles.magenta
            },
            global: this.ansiStyles.magenta,
            item: {after: this.forceColor.grey(',')},
            list: {openBracket: this.forceColor.grey('['), closeBracket: this.forceColor.grey(']')},
            mapEntry: {after: this.forceColor.grey(',')},
            maxDepth: this.forceColor.grey('…'),
            null: this.ansiStyles.yellow,
            number: this.ansiStyles.yellow,
            object: {
                openBracket: this.forceColor.grey('{'),
                closeBracket: this.forceColor.grey('}'),
                ctor: this.ansiStyles.magenta,
                stringTag: {open: this.ansiStyles.magenta.open + '@', close: this.ansiStyles.magenta.close},
                secondaryStringTag: {open: this.ansiStyles.grey.open + '@', close: this.ansiStyles.grey.close}
            },
            property: {
                after: this.forceColor.grey(','),
                keyBracket: {open: this.forceColor.grey('['), close: this.forceColor.grey(']')},
                valueFallback: this.forceColor.grey('…')
            },
            react: {
                functionType: this.forceColor.grey('\u235F'),
                openTag: {
                    start: this.forceColor.grey('<'),
                    end: this.forceColor.grey('>'),
                    selfClose: this.forceColor.grey('/'),
                    selfCloseVoid: ' ' + this.forceColor.grey('/')
                },
                closeTag: {
                    open: this.forceColor.grey('</'),
                    close: this.forceColor.grey('>')
                },
                tagName: this.ansiStyles.magenta,
                attribute: {
                    separator: '=',
                    value: {
                        openBracket: this.forceColor.grey('{'),
                        closeBracket: this.forceColor.grey('}'),
                        string: {
                            line: {open: this.forceColor.blue('"'), close: this.forceColor.blue('"'), escapeQuote: '"'}
                        }
                    }
                },
                child: {
                    openBracket: this.forceColor.grey('{'),
                    closeBracket: this.forceColor.grey('}')
                }
            },
            regexp: {
                source: {open: this.ansiStyles.blue.open + '/', close: '/' + this.ansiStyles.blue.close},
                flags: this.ansiStyles.yellow
            },
            stats: {separator: this.forceColor.grey('---')},
            string: {
                open: this.ansiStyles.blue.open,
                close: this.ansiStyles.blue.close,
                line: {open: this.forceColor.blue('\''), close: this.forceColor.blue('\'')},
                multiline: {start: this.forceColor.blue('`'), end: this.forceColor.blue('`')},
                controlPicture: this.ansiStyles.grey,
                diff: {
                    insert: {
                        open: this.ansiStyles.bgGreen.open + this.ansiStyles.black.open,
                        close: this.ansiStyles.black.close + this.ansiStyles.bgGreen.close
                    },
                    delete: {
                        open: this.ansiStyles.bgRed.open + this.ansiStyles.black.open,
                        close: this.ansiStyles.black.close + this.ansiStyles.bgRed.close
                    },
                    equal: this.ansiStyles.blue,
                    insertLine: {
                        open: this.ansiStyles.green.open,
                        close: this.ansiStyles.green.close
                    },
                    deleteLine: {
                        open: this.ansiStyles.red.open,
                        close: this.ansiStyles.red.close
                    }
                }
            },
            symbol: this.ansiStyles.yellow,
            typedArray: {
                bytes: this.ansiStyles.yellow
            },
            undefined: this.ansiStyles.yellow
        };

        this.htmlDumpTheme = {
            /**
             * keyword in a regular Algol-style language
             */
            keyword: this.chalk.blue,

            /**
             * built-in or library object (constant, class, function)
             */
            built_in: this.chalk.cyan,

            /**
             * user-defined type in a language with first-class syntactically significant types, like
             * Haskell
             */
            type: this.chalk.cyan.dim,

            /**
             * special identifier for a built-in value ("true", "false", "null")
             */
            literal: this.chalk.blue,

            /**
             * number, including units and modifiers, if any.
             */
            number: this.chalk.green,

            /**
             * literal regular expression
             */
            regexp: this.chalk.red,

            /**
             * literal string, character
             */
            string: this.chalk.greenBright,

            /**
             * parsed section inside a literal string
             */
            subst: this.plainFormat,

            /**
             * symbolic constant, interned string, goto label
             */
            symbol: this.plainFormat,

            /**
             * class or class-level declaration (interfaces, traits, modules, etc)
             */
            class: this.chalk.blue,

            /**
             * function or method declaration
             */
            function: this.chalk.yellow,

            /**
             * name of a class or a function at the place of declaration
             */
            title: this.plainFormat,

            /**
             * block of function arguments (parameters) at the place of declaration
             */
            params: this.plainFormat,

            /**
             * comment
             */
            comment: this.chalk.green,

            /**
             * documentation markup within comments
             */
            doctag: this.chalk.green,

            /**
             * flags, modifiers, annotations, processing instructions, preprocessor directive, etc
             */
            meta: this.chalk.grey,

            /**
             * keyword or built-in within meta construct
             */
            'meta-keyword': this.plainFormat,

            /**
             * string within meta construct
             */
            'meta-string': this.plainFormat,

            /**
             * heading of a section in a config file, heading in text markup
             */
            section: this.plainFormat,

            /**
             * XML/HTML tag
             */
            tag: this.chalk.green,

            /**
             * name of an XML tag, the first word in an s-expression
             */
            name: this.chalk.green,

            /**
             * s-expression name from the language standard library
             */
            'builtin-name': this.plainFormat,

            /**
             * name of an attribute with no language defined semantics (keys in JSON, setting names in
             * .ini), also sub-attribute within another highlighted object, like XML tag
             */
            attr: this.chalk.yellow,

            /**
             * name of an attribute followed by a structured value part, like CSS properties
             */
            attribute: this.plainFormat,

            /**
             * variable in a config or a template file, environment var expansion in a script
             */
            variable: this.plainFormat,

            /**
             * list item bullet in text markup
             */
            bullet: this.plainFormat,

            /**
             * code block in text markup
             */
            code: this.plainFormat,

            /**
             * emphasis in text markup
             */
            emphasis: this.chalk.italic,

            /**
             * strong emphasis in text markup
             */
            strong: this.chalk.bold,

            /**
             * mathematical formula in text markup
             */
            formula: this.plainFormat,

            /**
             * hyperlink in text markup
             */
            link: this.chalk.underline,

            /**
             * quotation in text markup
             */
            quote: this.plainFormat,

            /**
             * tag selector in CSS
             */
            'selector-tag': this.plainFormat,

            /**
             * #id selector in CSS
             */
            'selector-id': this.plainFormat,

            /**
             * .class selector in CSS
             */
            'selector-class': this.plainFormat,

            /**
             * [attr] selector in CSS
             */
            'selector-attr': this.plainFormat,

            /**
             * :pseudo selector in CSS
             */
            'selector-pseudo': this.plainFormat,

            /**
             * tag of a template language
             */
            'template-tag': this.plainFormat,

            /**
             * variable in a template language
             */
            'template-variable': this.plainFormat,

            /**
             * added or changed line in a diff
             */
            addition: this.chalk.green,

            /**
             * deleted line in a diff
             */
            deletion: this.chalk.red,
        };
    }

    diff(actual, expected)
    {
        if (this.isHtml(actual)) {
            actual = this.prettier.format(actual);
            actual = actual.substring(0, actual.length - 2);
            actual = this.highlight(actual, {language: 'html', ignoreIllegals: true, theme: this.htmlDumpTheme});
        }

        if (this.isHtml(expected)) {
            expected = this.prettier.format(expected);
            expected = expected.substring(0, expected.length - 2);
            expected = this.highlight(expected, {language: 'html', ignoreIllegals: true, theme: this.htmlDumpTheme});
        }

        return '  ' + this.concordance.diff(actual, expected, {plugins: [], theme: this.dumpTheme})
            .split('\n').join('\n  ');
    }

    ddDiff(actual, expected)
    {
        this.diff(actual, expected);

        process.exit(0);
    }

    dump(value)
    {
        if (this.isHtml(value)) {
            value = this.prettier.format(value);
            value = value.substring(0, value.length - 2);
            value = this.highlight(value, {language: 'html', ignoreIllegals: true, theme: this.htmlDumpTheme});

            console.log(
                '  ' + value.split('\n').join('\n  ')
            );

            return;
        }

        let formatted = this.concordance.format(value, {plugins: [], theme: this.dumpTheme})

        if (typeof value == 'object' && value !== null) {
            if (value.constructor == Array) {
                formatted = this.chalk.magenta('Array ') + formatted;
            }

            if (value.constructor == Object) {
                formatted = this.chalk.magenta('Object ') + formatted;
            }
        }

        console.log(
            '  ' + formatted.split('\n').join('\n  ')
        );
    }

    dd(value)
    {
        this.dump(value)

        process.exit(0);
    }

    makeGlobal()
    {
        global.dump = (value) => {
            this.dump(value);
        }

        global.dd = (value) => {
            this.dd(value);
        }

        global.diff = (actual, expected) => {
            this.diff(actual, expected);
        }

        global.dd_diff = (actual, expected) => {
            this.ddDiff(actual, expected);
        }
    }
}