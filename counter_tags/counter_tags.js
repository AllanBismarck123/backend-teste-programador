// import './model/tag.js';
var writer = require('../file_manager/writer.js');
const Tag = require('../model/tag.js');
var urlWriter = '/Users/Allan/Downloads/writer.txt'

var counter_tags = (data) => {
    var tagOpen = false;
    var tagClose = true;
    var listTags = [];
    var length = data.length;
    var index = 0;
    var tagName = "";

    while (index != length) {

        if (data[index] == '<') {
            tagOpen = true;
            tagClose = false;
        }

        if (data[index] == '>') {
            tagOpen = false;
            tagClose = true;

            if (tagName.indexOf(' ') >= 0) {
                tagName = tagName.split(' ')[0];
            }

            listTags.push(tagName);
            // writer(urlWriter, tagName + '\n')
            tagName = "";
        }

        if (data[index] != '<' && tagOpen) {
            tagName = tagName + data[index];
        }

        index++;

    }

    var result = agroup_tags(listTags);
    var page = parse_to_object(result);
    return page;
}

var agroup_tags = (listTags) => {
    var listTagsLocal = listTags
    var dbTag = [];

    for (let i = 0; i < listTags.length; i++) {
        for (let j = 0; j < listTags.length; j++) {
            if (('/' + listTags[i]) == listTagsLocal[j]) {
                listTagsLocal.splice(j, 1);
            }
        }
    };

    listTagsLocal.forEach(it => {
        if (dbTag.length > 0) {
            var update = false
            for (let j = 0; j < dbTag.length; j++) {
                if (it == dbTag[j].getName()) {
                    dbTag[j].incrementNumberTimes();
                    update = true
                }
            }

            if(update == false) {
                let tag = new Tag();
                tag.setName(it);
                tag.setNumberTimes(1);
                dbTag.push(tag);
            }

        } else {
            let tag = new Tag();
            tag.setName(it);
            tag.setNumberTimes(1);
            dbTag.push(tag);
        }
    });

    return dbTag;
}

var parse_to_object = (listTags) => {
    var page = {
        tags: []
    };
    
    listTags.forEach((i) => {
        var objTag = {
            name: i.getName(),
            numberTimes: i.getNumberTimes().toString()
        }
        page.tags.push(objTag);
    });

    return page;

}

module.exports = counter_tags;