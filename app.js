const app = new Vue({
    el: '#app',
    data: {
        audios: [],
        videos: [],
        selectedAudio: '', //�ǋL
        selectedVideo: '', //�ǋL
    },
    methods: {
        onChange: function (){
            if(this.selectedAudio != '' && this.selectedVideo != ''){
                this.connectLocalCamera();
            }
        },

        connectLocalCamera: async function (){
            alert('�f�o�C�X���I������܂����B');
        }
    },
    mounted: async function () {
            //�f�o�C�X�ւ̃A�N�Z�X
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();

        //1. �I�[�f�B�I�f�o�C�X�̏����擾
        deviceInfos
        .filter(deviceInfo => deviceInfo.kind === 'audioinput')
        .map(audio => this.audios.push({text: audio.label || `Microphone ${this.audios.length + 1}`, value: audio.deviceId}));

        //2. �J�����̏����擾
        deviceInfos
        .filter(deviceInfo => deviceInfo.kind === 'videoinput')
        .map(video => this.videos.push({text: video.label || `Camera  ${this.videos.length - 1}`, value: video.deviceId}));

        console.log(this.audios, this.videos);     }
});