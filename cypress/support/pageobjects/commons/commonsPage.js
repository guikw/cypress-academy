
class CommonsPage {

    objectJson(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    trimSpacesJson(object) {
        object.map(item => {
            let objEntries = Object.entries(item);
            return objEntries.reduce((obj, currObj) => {
                const key = currObj[0].trim();
                const value = currObj[1].trim();
                obj[key] = value;
                return obj;
            }, {});
        });
    }

    replacer(key, value) {
        if (typeof value === "number") {
          return value+"";
        }
        return value;
    }

}

export default CommonsPage;