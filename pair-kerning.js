(function() {

    var tagStr = '<\/?[a-z]+(?:\\s[^<]*?\"|\')*?>';
    var KerningTagStr = '<span\\sstyle="margin\\-right\\:([\\d\\.\\-]+)em">';
    var nestedKerningTagExp = new RegExp('(?:' + KerningTagStr + '){2,}(.)(?:<\/span>){2,}', 'g');

    // ペアを一文字目と二文字目に分割
    function parsePair(pairStr) {
        return pairStr.match(/(\[.*?\]|\\.|\^.|\$.|\*.|\+.|\?.|.)/g);
    }

    // HTML文字列を文字詰めして返す
    function pairKernText(htmlText, pairs) {
        pairs.forEach(function (pair) {
            var parsedPair = parsePair(pair[0]);

            function replacer(match, submatch) {
                if (submatch == ">") return submatch;
                return '<span style="margin-right:' + pair[1] + 'em">' + submatch + '</span>';
            }
            
            // ペアを見つけた場合文字詰め用のspanタグを挿入
            var pairExp = new RegExp("(" + parsedPair[0] + ")(?=(?:" + tagStr + ")*?" + parsedPair[1] + "[^>]*?(<|$))", "g");
            htmlText = htmlText.replace(pairExp, replacer);
        })

        // 重複した文字詰め用タグは後から挿入されたものを優先して残し、他は削除
        return htmlText.replace(nestedKerningTagExp, '<span style="margin-right:$1em">$2</span>');
    }

    // 指定したクラスを持つ要素を文字詰めして更新
    function pairKern(targetClass, pairs) {
        var targetElms = document.getElementsByClassName(targetClass);

        [].forEach.call(targetElms, function (elm) {
            elm.innerHTML = pairKernText(elm.innerHTML, pairs);
        });
    }

    this.pairKernText = pairKernText;
    this.pairKern = pairKern;
})();