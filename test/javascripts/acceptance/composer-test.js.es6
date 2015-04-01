import { acceptance } from "helpers/qunit-helpers";

acceptance("Composer", { loggedIn: true });

test("Tests the Composer controls", () => {
  visit("/");
  andThen(() => {
    ok(exists('#create-topic'), 'the create button is visible');
  });

  click('#create-topic');
  andThen(() => {
    ok(exists('#wmd-input'), 'the composer input is visible');
    ok(exists('.title-input .popup-tip.bad.hide'), 'title errors are hidden by default');
    ok(exists('.textarea-wrapper .popup-tip.bad.hide'), 'body errors are hidden by default');
  });

  click('a.toggle-preview');
  andThen(() => {
    ok(!exists('#wmd-preview:visible'), "clicking the toggle hides the preview");
  });

  click('a.toggle-preview');
  andThen(() => {
    ok(exists('#wmd-preview:visible'), "clicking the toggle shows the preview again");
  });

  click('#reply-control button.create');
  andThen(() => {
    ok(!exists('.title-input .popup-tip.bad.hide'), 'it shows the empty title error');
    ok(!exists('.textarea-wrapper .popup-tip.bad.hide'), 'it shows the empty body error');
  });

  fillIn('#reply-title', "this is my new topic title");
  andThen(() => {
    ok(exists('.title-input .popup-tip.good'), 'the title is now good');
  });

  fillIn('#wmd-input', "this is the *content* of a post");
  andThen(() => {
    equal(find('#wmd-preview').html(), "<p>this is the <em>content</em> of a post</p>", "it previews content");
    ok(exists('.textarea-wrapper .popup-tip.good'), 'the body is now good');
  });

  click('#reply-control button.create');
  andThen(() => {
    ok(false);
  });


});
