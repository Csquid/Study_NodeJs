const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser");

/* 
    suggest: 제안하다
*/
router.post("/suggest", function(req, res) {
    searchKeywordData = req.body.keyword;
    // console.log(req.body);

    const dummyData = {
        '가': {
            'writer': 'anonymous',
            'title': '가',
            'star': 2.1
        },
        '가나': {
            'writer': 'black',
            'title': '가나',
            'star': 3
        },
        '가나링': {
            'writer': 'gana',
            'title': '가나링',
            'star': 4
        },
        '가위': {
            'writer': 'ghost',
            'title': '가위',
            'star': 5
        },
        '코로나': {
            'writer': 'korean',
            'title': '코로나',
            'star': 5
        },
        '위가나': {
            'writer': 'bono',
            'title': '위가나',
            'star': 1
        }
    }

    const dontFoundData = -1;
    let sendData = {};
    
    let responseData = {
        'signal': '',
        'detail': {
            'data': {},
            'err': ''
        }
    };

    /* 만약 검색 결과가 없다면 */
    if(searchKeywordData === "") {

        responseData.signal = 'fail';
        responseData.detail.err = 'value is null';

    } else {
        responseData.signal = 'success';
        responseData.detail.data.searchKeyword = searchKeywordData;

        sendData["length"] = 0;
        Object.keys(dummyData).forEach(function(key) {
            // console.log(key + ": " + dummyData[key]);
            
            if((key.indexOf(searchKeywordData) != dontFoundData) && (key.charAt(0) == searchKeywordData.charAt(0))) {
                sendData[key] = dummyData[key];
                sendData.length += 1;
            }
        });

        responseData.detail.data.result = sendData;
    }

    res.json(responseData);
    // res.render("index.ejs", {"data": responseData});
});

router.get("/get_test", function(req, res) {
    console.log("id: " + req.query.id);
    console.log("pw: " + req.query.pw);
});

module.exports = router;