[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/matt-riley/cvcsv-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/matt-riley/cvcsv-cli/context:javascript)

# cvcsv-cli

This is a tool to make the process of creating the bulk import CSV file for [Google Clouds Vision Product Search API](https://cloud.google.com/vision/product-search/docs/) a little easier.

[Here](https://cloud.google.com/vision/product-search/docs/csv-format) is the documentation for the formatting the CSV.

## Prerequisites

* Node
* The data should be organised as follows:

  ```shell
  .
  ├── kitkat
  │   └── chunky
  │       ├── peanut_butter
  │       │   ├── 01.jpg
  │       │   ├── 02.jpg
  │       ├── plain
  │       │   ├── 01.jpg
  │       │   ├── 02.jpg
  │       ├── salted_caramel
  │       │   ├── 01.jpg
  │       │   ├── 02.jpg
  │       │   ├── 03.jpg
  │       └── white
  │           └── 01.png
  ```

## How to use

```shell
npm i -g @matt-riley/cvcsv-cli
```

Note: The package is published to [Github Package Registry](https://github.com/features/package-registry) follow [these](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#installing-a-package) instructions in order to be able to install this package and others from there.

Then once the package has been installed:

```shell
cvcsv
```

The CLI will then ask a few questions relating to the data, i.e. where it is, the GCP bucket name, etc.

The output file will be created in the directory that you provide as the source of the images you wish to add to the csv.

[![asciicast](https://asciinema.org/a/CF38ujjDZmvxUwmsWVM9DZ75E.svg)](https://asciinema.org/a/CF38ujjDZmvxUwmsWVM9DZ75E)

## Config File

The CLI will read a config file from within the directory that it is executed.

The file should be named `.cvcsvrc` and the structure is as follows:

```json
{
  "bucketName": "the-name-of-the-gs-bucket-the-sample-images-are-stored",
  "csvFileLocation": "where-you-would-like-to-save-the-csv-file",
  "csvFilename": "the-name-of-the-file.csv",
  "productCategory": "any-of-the-product-categories-GCP-CV-has",
  "productSet": "the-name-of-your-product-set",
  "rootDirectory": "the-root-directory-of-your-images"
}
```

You can complete the whole file or you can miss any of the fields out, the CLI will ask you for any that are missing.

If not file is there then you will get the full set of questions.

## TODO

* Improve the tests.
* Add to my personal Homebrew tap to make updates/upgrades easier to manage.
* Confirmation screen.

## FAQ

*Why isn't this just published to NPM like everything else?*

Well for a start there is [this](https://www.theregister.co.uk/2019/04/22/npm_fired_staff_union_complaints/) and [this](https://www.theregister.co.uk/2019/04/01/npm_layoff_staff/).
