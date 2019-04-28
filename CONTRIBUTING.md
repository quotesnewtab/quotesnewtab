# Contribution Guidelines

**First off, thanks for taking the time to contribute!** 🤗

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Using the issue tracker

The [issue tracker](https://github.com/quotesnewtab/quotesnewtab/issues) is
the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests)
and [submitting pull requests](#pull-requests), but please respect the following
restrictions:

* Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

* Please **do not** post comments consisting solely of "+1" or "👍".
  Use [GitHub's "reactions" feature](https://blog.github.com/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/)
  instead. We reserve the right to delete comments which violate this rule.

## Issues and labels

Our bug tracker utilizes several labels to help organize and identify issues. Here's what they represent and how we use them:

* `bug` - Issues that are identifying a bug.
* `dev` - Issues that are for development purposes, generally created by the developer.
* `docs` - Issues for improving or updating our documentation.
* `duplicate` - Issues that already exist.
* `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified.
* `help wanted` - Issues we need or would love help from the community to resolve.
* `question` - Issues for general questions regarding the extension, in most cases this can be handled by e-mail instead. See [this page](https://quotesnewtab.com/about) for contact information.
* `wontfix` - Issues with an identified bug that will not be fixed.

For a complete look at our labels, see the [project labels page](https://github.com/quotesnewtab/quotesnewtab/labels).

## Pull Requests

Pull requests for new features, bug fixes, etc. are often appreciated.

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

Guidelines for pull requests:

* **Make your commit messages as descriptive as possible.** Include as much information as you can. Explain anything that the file diffs themselves won’t make apparent.
* **Document your pull request.** Explain your fix and link to the relevant issue.
* **Make sure the target of your pull request is the relevant branch.** Most of bugfix or new feature should go to the `master` branch.
* **Include only related work.** If your pull request has unrelated commit, it won't be accepted.

## Feature Requests

Before creating an feature request, please search to see if someone has requested the feature already. If there is an open request, please add a 👍.

If the feature has not already been requested, [create an issue](https://github.com/quotesnewtab/quotesnewtab/issues/new?title=Feature%20request:) with a title of `Feature request: <feature name>` and add as much information as possible.

## Bug Reports

Before reporting an issue, please search to see if someone has filed a similar issue before. If there is already an open issue, please add a 👍 and/or leave a comment with additional information.

When creating a new issue make sure to include the following:

* Version of `Quotes New Tab` in use. Check [here](chrome://extensions/).
* Time of bug. In most cases this won't actually be needed but when the bug is related to our API this makes it easier for us to figure out what went wrong when looking at the error logs. Make sure it is in [UTC-format](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
* Steps to reproduce. Even if the step is small, **include it!** Include the actual result and what you expected.
* Any message or error you get in the console, if you do.
* A screenshot of any visual bug.

Here is what a great bug report would look like:

```md
## Prerequisites

Version: v2.0.0
Operating system: Mac OSX
Time of bug: 2019-04-05 14:31:38

## Step to reproduce

1. Open new tab.
2. Open settings.
3. Changing font for 'Quote'.
4. Close settings.

### Actual behavior:

Nothing happens.

### Expected behavior

Font changes to chosen font.

## Any message or error

No console output
...

## Screenshot

Link to screenshot
...
```

## License

By contributing your code, you agree to license your contribution under the [MIT License](https://github.com/quotesnewtab/quotesnewtab/blob/master/LICENSE).