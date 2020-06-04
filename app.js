const APIKEY = 'af99b8e9-3445-46f3-aec6-67c520c0592d'; //追記


const app = new Vue({
    el: '#app',
    data: {
        audios: [],
        videos: [],
        selectedAudio: '',
        selectedVideo: '',
	    peerId: '', //追記

    },
    methods: {
        onChange: function (){
            if(this.selectedAudio != '' && this.selectedVideo != ''){
                this.connectLocalCamera();
            }
        },

        connectLocalCamera: async function (){
            const constraints = {
                audio: this.selectedAudio ? { deviceId: { exact: this.selectedAudio } } : false,
                video: this.selectedVideo ? { deviceId: { exact: this.selectedVideo } } : false
            }

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            document.getElementById('my-video').srcObject = stream;
        }
    },
    mounted: async function () {
        this.peer = new Peer({key: APIKEY, debug: 3}); //新規にPeerオブジェクトの作成
        this.peer.on('open', () => this.peerId = this.peer.id); //PeerIDを反映

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

        console.log(this.audios, this.videos);
     }
});