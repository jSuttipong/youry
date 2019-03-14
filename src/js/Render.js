/* eslint-disable */
export const RENDER = {
    data(){
        return{
            s: '77777'
        }
    },
        renderImage(e,image) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            // console.log('this Image:',files[0])
            // this.createImage(files[0]);
            var file = files[0]
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = e => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = e => {
                    vm.s = e.target.result;
                };
                reader.readAsDataURL(file);
                return image
                // console.log('this data --->',this.s)
            
            // return this.image
        },
}