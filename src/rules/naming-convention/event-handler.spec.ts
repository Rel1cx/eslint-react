/* eslint-disable eslint-plugin/test-case-shorthand-strings */
import RuleTester from "../../../test/rule-tester";
import rule, { RULE_NAME } from "./event-handler";

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2021,
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code: `<App onChange={this.handleChange} />`,
        },
        {
            code: `<App onChange={this.props.onChange} />`,
        },
        {
            code: `<App onChange={this.props.handleChange} />`,
        },
        {
            code: `<App onChange={() => 42} />`,
        },
        {
            code: `<App onChange={this.props.onFoo} />`,
        },
        {
            code: `<App isSelected={this.props.isSelected} />`,
        },
        {
            code: `<App shouldDisplay={this.state.shouldDisplay} />`,
        },
        {
            code: `<App shouldDisplay={arr[0].prop} />`,
        },
        {
            code: `<App onChange={props.onChange} />`,
        },
        {
            code: `<App ref={this.handleRef} />`,
        },
        {
            code: `<App ref={this.somethingRef} />`,
        },
        {
            code: `<App only={this.only} />`,
        },
        {
            code: `<App onClick={this.handle123LogoClick} />`,
        },
    ],
    invalid: [
        {
            code: `<App onChange={this.doSomethingOnChange} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App onChange={this.handlerChange} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App onChange={this.handle} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App onChange={this.handle2} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App onChange={this.handl3Change} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App onChange={this.handle4change} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App only={this.handleChange} />`,
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                },
            ],
        },
        {
            code: `<App only={this.handleChange} />`,
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<App handleChange={this.handleChange} />`,
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<App onChange={this.onChange} />`,
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
    ],
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code: `<App onChange={handleChange} />`,
            options: [{ checkLocalVariables: true }],
        },
        {
            code: `<App onChange={takeCareOfChange} />`,
            options: [{ checkLocalVariables: false }],
        },
        {
            code: `<App onChange={event => window.alert(event.target.value)} />`,
            options: [{ checkInlineFunction: false }],
        },
        {
            code: `<App onChange={() => handleChange()} />`,
            options: [
                {
                    checkInlineFunction: true,
                    checkLocalVariables: true,
                },
            ],
        },
        {
            code: `<App onChange={() => this.handleChange()} />`,
            options: [{ checkInlineFunction: true }],
        },
        {
            code: `<App test={this.props.content} />`,
            options: [
                {
                    eventHandlerPrefix: "on",
                    eventHandlerPropPrefix: "on",
                },
            ],
        },
        {
            code: `<App onChange={this.someChange} />`,
            options: [
                {
                    eventHandlerPrefix: false,
                    eventHandlerPropPrefix: "on",
                },
            ],
        },
        {
            code: `<App somePrefixChange={this.someChange} />`,
            options: [
                {
                    eventHandlerPrefix: false,
                    eventHandlerPropPrefix: "somePrefix",
                },
            ],
        },
        {
            code: `<App someProp={this.handleChange} />`,
            options: [{ eventHandlerPropPrefix: false }],
        },
        {
            code: `<App someProp={this.somePrefixChange} />`,
            options: [
                {
                    eventHandlerPrefix: "somePrefix",
                    eventHandlerPropPrefix: false,
                },
            ],
        },
        {
            code: `<App someProp={props.onChange} />`,
            options: [{ eventHandlerPropPrefix: false }],
        },
    ],
    invalid: [
        {
            code: `<App onChange={takeCareOfChange} />`,
            options: [{ checkLocalVariables: true }],
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App onChange={() => this.takeCareOfChange()} />`,
            options: [{ checkInlineFunction: true }],
            errors: [
                {
                    messageId: "INVALID_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<App whenChange={handleChange} />`,
            options: [{ checkLocalVariables: true }],
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<App whenChange={() => handleChange()} />`,
            options: [
                {
                    checkInlineFunction: true,
                    checkLocalVariables: true,
                },
            ],
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<App onChange={handleChange} />`,
            options: [
                {
                    checkLocalVariables: true,
                    eventHandlerPrefix: "handle",
                    eventHandlerPropPrefix: "when",
                },
            ],
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "when",
                    },
                },
            ],
        },
        {
            code: `<App onChange={() => handleChange()} />`,
            options: [
                {
                    checkInlineFunction: true,
                    checkLocalVariables: true,
                    eventHandlerPrefix: "handle",
                    eventHandlerPropPrefix: "when",
                },
            ],
            errors: [
                {
                    messageId: "INVALID_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "when",
                    },
                },
            ],
        },
    ],
});
