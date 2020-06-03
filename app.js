const app = new Vue({
    el: '#app',
    data: {
        audios: [],
        videos: [],
        selectedAudio: '', //追記
        selectedVideo: '', //追記
    },
    methods: {
        onChange: function (){
            if(this.selectedAudio != '' && this.selectedVideo != ''){
                this.connectLocalCamera();
            }
        },

        connectLocalCamera: async function (){
            alert('デバイスが選択されました。');
        }
    },
    mounted: async function () {
            //デバイスへのアクセス
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();

        //1. オーディオデバイスの情報を取得
        deviceInfos
        .filter(deviceInfo => deviceInfo.kind === 'audioinput')
        .map(audio => this.audios.push({text: audio.label || `Microphone ${this.audios.length + 1}`, value: audio.deviceId}));

        //2. カメラの情報を取得
        deviceInfos
        .filter(deviceInfo => deviceInfo.kind === 'videoinput')
        .map(video => this.videos.push({text: video.label || `Camera  ${this.videos.length - 1}`, value: video.deviceId}));

        console.log(this.audios, this.videos);     }
});