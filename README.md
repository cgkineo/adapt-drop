# adapt-drop

A dropdown extension to expand and shrink elements.

## Installation

* Add the [example JSON](example.json) to elements you wish to shrink. Drop can be used on any element: course, content object, article, block or component.
* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

## Usage

* Select the buttons to expand and shrink elements.

## Attributes

<table>
  <tr>
    <th>Attribute</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>_isEnabled</code></td>
    <td>Boolean</td>
    <td>Add a dropdown button to expand and shrink the element</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>_classes</code></td>
    <td>String</td>
    <td>Custom classes to add to the container</td>
    <td><code>""</code></td>
  </tr>
  <tr>
    <td><code>title</code></td>
    <td>String</td>
    <td>Button text</td>
    <td><code>""</code></td>
  </tr>
  <tr>
    <td><code>ariaLabel</code></td>
    <td>String</td>
    <td>Button label for assistive technologies</td>
    <td><code>""</code></td>
  </tr>
</table>

---

**Framework versions:** 5.20+<br>
**Author / maintainer:** CGKineo<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari 12+13 for macOS/iOS/iPadOS, Opera<br>
