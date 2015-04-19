### *To B, or to A? That's the question*

Hamlet is an AngularJS A/B testing framework. Plug in Hamlet to your AngularJS application to test multiple variants of content on any page.

### Features
Hamlet supports the following features:

1. Supports testing multiple variations. Hamlet is not just an A/B testing framework. It's an A/B/C/D/... testing framework!
2. Show different portions of content to different audiences *on the same page*. Supports DOM element level variations.
3. Control ratio of how much of the audience needs to see each variation. 
4. Stickiness. Let Hamlet know an ID / session value that identifies a unique user, and Hamlet ensures stickiness. Once a user sees a version, they'll always see the same version, even in multiple browsers.

### How to use

1. Identify a value (some sort of user ID) that uniquely identifies your users.
2. Create multiple branches (up to 10 branches) by adding a `<div>` for each branch, and add code your variants.
3. Configure ratios (0 - 1) for each branch to control how many of your users see each branch.

And Hamlet does the rest

```html
<div ab-test ab-test-qualifier="{{userId}}">
  <div test-branch ratio="0.1">
    <h4>Branch 1</h4>
  </div>
  <div test-branch ratio="0.6">
    <h4>Branch 2</h4>
  </div>
  <div test-branch ratio="0.3">
    <h4>Branch 3</h4>
  </div>
</div>
```

### Get Hamlet

#### Bower
```
bower install hamlet
```
### JS / Source
```
https://github.com/koushikkothagal/hamlet
```



### Authors and Contributors
@koushikkothagal

