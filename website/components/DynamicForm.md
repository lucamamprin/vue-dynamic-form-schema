# DynamicForm

## Props

<!-- @vuese:DynamicForm:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|schema|the JSON schema representing the form structure.|`Object`|`true`|-|
|value|-|`Object`|`true`|-|
|nameSpace|A unique string that works as ID for the form. This is useful in case you need two identical forms that have different data (eg: shipping and billing address).|`String`|`true`|-|
|showErrors|by default show errors while the user is typing if it's needed to show on submit, its value must be handled by the parent component|`Boolean`|`false`|true|
|darkMode|If set to `true`, add classes to handle a form in a dark background.|`Boolean`|`false`|false|
|initialValue|Set the initial value for each field. For checkboxes it is recommended setting this to `false`|`String` /  `Boolean`|`false`|null|

<!-- @vuese:DynamicForm:props:end -->


## Events

<!-- @vuese:DynamicForm:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|status|-|-|
|mounted|-|-|

<!-- @vuese:DynamicForm:events:end -->


