/* eslint-disable eslint-plugin/test-case-shorthand-strings */
import RuleTester from "../../test/rule-tester";
import rule from "./enforce-event-handler-naming-convention";

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

const RULE_NAME = "jsx-handler-names";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code: `<TestComponent onChange={this.handleChange} />`,
        },
        {
            code: `<TestComponent onChange={this.props.onChange} />`,
        },
        {
            code: `<TestComponent onChange={this.props.handleChange} />`,
        },
        {
            code: `<TestComponent onChange={() => 42} />`,
        },
        {
            code: `<TestComponent onChange={this.props.onFoo} />`,
        },
        {
            code: `<TestComponent isSelected={this.props.isSelected} />`,
        },
        {
            code: `<TestComponent shouldDisplay={this.state.shouldDisplay} />`,
        },
        {
            code: `<TestComponent shouldDisplay={arr[0].prop} />`,
        },
        {
            code: `<TestComponent onChange={props.onChange} />`,
        },
        {
            code: `<TestComponent ref={this.handleRef} />`,
        },
        {
            code: `<TestComponent ref={this.somethingRef} />`,
        },
        {
            code: `<TestComponent only={this.only} />`,
        },
        {
            code: `<TestComponent onClick={this.handle123LogoClick} />`,
        },
    ],
    invalid: [
        {
            code: `<TestComponent onChange={this.doSomethingOnChange} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.handlerChange} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.handle} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.handle2} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.handl3Change} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.handle4change} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent only={this.handleChange} />`,
            errors: [
                {
                    messageId: "BAD_PROP_KEY",
                },
            ],
        },
        {
            code: `<TestComponent only={this.handleChange} />`,
            errors: [
                {
                    messageId: "BAD_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<TestComponent handleChange={this.handleChange} />`,
            errors: [
                {
                    messageId: "BAD_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.onChange} />`,
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
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
            code: `<TestComponent onChange={handleChange} />`,
            options: [{ checkLocalVariables: true }],
        },
        {
            code: `<TestComponent onChange={takeCareOfChange} />`,
            options: [{ checkLocalVariables: false }],
        },
        {
            code: `<TestComponent onChange={event => window.alert(event.target.value)} />`,
            options: [{ checkInlineFunction: false }],
        },
        {
            code: `<TestComponent onChange={() => handleChange()} />`,
            options: [
                {
                    checkInlineFunction: true,
                    checkLocalVariables: true,
                },
            ],
        },
        {
            code: `<TestComponent onChange={() => this.handleChange()} />`,
            options: [{ checkInlineFunction: true }],
        },
        {
            code: `<TestComponent test={this.props.content} />`,
            options: [
                {
                    eventHandlerPrefix: "on",
                    eventHandlerPropPrefix: "on",
                },
            ],
        },
        {
            code: `<TestComponent onChange={this.someChange} />`,
            options: [
                {
                    eventHandlerPrefix: false,
                    eventHandlerPropPrefix: "on",
                },
            ],
        },
        {
            code: `<TestComponent somePrefixChange={this.someChange} />`,
            options: [
                {
                    eventHandlerPrefix: false,
                    eventHandlerPropPrefix: "somePrefix",
                },
            ],
        },
        {
            code: `<TestComponent someProp={this.handleChange} />`,
            options: [{ eventHandlerPropPrefix: false }],
        },
        {
            code: `<TestComponent someProp={this.somePrefixChange} />`,
            options: [
                {
                    eventHandlerPrefix: "somePrefix",
                    eventHandlerPropPrefix: false,
                },
            ],
        },
        {
            code: `<TestComponent someProp={props.onChange} />`,
            options: [{ eventHandlerPropPrefix: false }],
        },
    ],
    invalid: [
        {
            code: `<TestComponent onChange={takeCareOfChange} />`,
            options: [{ checkLocalVariables: true }],
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={() => this.takeCareOfChange()} />`,
            options: [{ checkInlineFunction: true }],
            errors: [
                {
                    messageId: "BAD_HANDLER_NAME",
                    data: {
                        propKey: "onChange",
                        handlerPrefix: "handle",
                    },
                },
            ],
        },
        {
            code: `<TestComponent whenChange={handleChange} />`,
            options: [{ checkLocalVariables: true }],
            errors: [
                {
                    messageId: "BAD_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<TestComponent whenChange={() => handleChange()} />`,
            options: [
                {
                    checkInlineFunction: true,
                    checkLocalVariables: true,
                },
            ],
            errors: [
                {
                    messageId: "BAD_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "on",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={handleChange} />`,
            options: [
                {
                    checkLocalVariables: true,
                    eventHandlerPrefix: "handle",
                    eventHandlerPropPrefix: "when",
                },
            ],
            errors: [
                {
                    messageId: "BAD_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "when",
                    },
                },
            ],
        },
        {
            code: `<TestComponent onChange={() => handleChange()} />`,
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
                    messageId: "BAD_PROP_KEY",
                    data: {
                        propValue: "handleChange",
                        handlerPropPrefix: "when",
                    },
                },
            ],
        },
    ],
});
