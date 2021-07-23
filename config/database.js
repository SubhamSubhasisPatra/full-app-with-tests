function getURL(){
    if(process.env.NODE_ENV === 'production'){
        return 'mongodb://localhost:27017/real_db'
    }else{
        return 'mongodb://localhost:27017/test_db'
    }
}

module.exports = getURL;




