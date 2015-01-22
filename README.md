# github-issues-importer
Imports issues to Github from local file




# Usage

Specify isseues.json file
---

Global ```user```, ```repo``` and ```assignee``` attributes can be overrided by specifiyng in issue.

Global ```labels``` attribute will be merged with specified in issue.

```json

{
    "user": "yetithefoot",
    "repo": "<REPO NAME HERE>",
    "assignee": "yetithefoot",
    "labels": [
        "example"
    ],
    "issues": [
        {
            "title": "Bug found in view rendering",
            "body": "Lorem ipsum",
            "assignee": "yetithefoot",
            "labels": [
                "bug",
                "medium"
            ]
        },
        {
            "title": "Hello from crashed app",
            "body": "Lorem ipsum, lorem ipsum",
            "labels": [
                "bug",
                "high"
            ]
        },
        {
            "user": "otheruser",
            "repo": "otherrepo",
            "title": "Make fun from each click",
            "body": "Lorem ipsum, lorem ipsum",
            "labels": [
                "feature"
            ]
        }
    ]
}

```
