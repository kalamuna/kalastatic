# Creating component templates

In the example below, we handle default and placeholder text in a way that we should aim to replicate throughout.

```
{% set buttonLabel = buttonLabel ?: metadata.config.defaults.buttonLabel %}
<button role="button" class="button {{buttonVariant}}">
  <span>{{ buttonLabel ?: 'Button Label' }}</span>
  <i class="icon terminal" aria-hidden="true"></i>
</button>
```

The first line checks to see if buttonLabel is set, if it's  not it looks for a default `{% set buttonLabel = buttonLabel ?: metadata.config.defaults.buttonLabel %}`

Later when we print the actual value, we use the ternary operator to print a String of text if buttonLabel is blank.
{{ buttonLabel ?: 'Button Label' }}


###Open question
Do we assume an object named 'button' get's passed in, and then  we print things out such as button.label?
