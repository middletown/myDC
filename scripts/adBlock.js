Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

function temp(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i])
            arr[i].remove()
    }
}

var adList = [
    document.getElementsByClassName('_BTN_AD_'),
    document.getElementsByClassName('adsByIdn32409'),
    document.getElementsByClassName('daum_ddn_area'),
    document.getElementById('list_right_ad'),
    document.getElementById('wif_adx_banner_wrap'),
    document.getElementById('ad-layer')
];

temp(adList);