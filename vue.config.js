module.exports = {
    devServer:{
        proxy : {
            // socket.io, websocket => 문자나 파일을 통신
            // webrtc => 실시간 화상채팅
            '/socket' : {  
                target:'http://localhost:3001',
                changeOrigin :true,
                logLevel : 'debug'
            },
            
            '/member' : { //rest
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },

            '/item' : { //rest
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
        },
    },
}