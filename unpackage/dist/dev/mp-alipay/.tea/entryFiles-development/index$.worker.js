if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-load-more/uni-load-more?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-data-checkbox/uni-data-checkbox?hash=02013bf0da0780993eda834d06df5d3e938ac7be');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-transition/uni-transition?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-popup/uni-popup?hash=4b30d785748b18d10f0b0a37b42b70e09ff6fcd4');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-popup-message/uni-popup-message?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-drawer/uni-drawer?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../node-modules/npm-scope-dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/main/header?hash=c1afd795e0b60a242652f5194bd9120495b975ba');
require('../../pages/main/personBox?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/main/drawer?hash=a8b4e3376a850e44b5fbb4e7a8d09ceee50b108d');
require('../../pages/classtable/module?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/main/mainModule?hash=c92c3fb9c4e8d90abe36c66c5f34da154011b1e7');
require('../../utils/header?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/login/login?hash=e5d5bc6480c9b83a36e4600a2cea5d50f68850e4');
require('../../pages/main/main?hash=a68cc8919db2c9fcb55510ed3ef3c3db5fe2bfee');
require('../../pages/domiScore/domiScore?hash=92de901c0882ece369e9df9f62acead493b4cf17');
require('../../pages/classtable/classtable?hash=8cc17e22bc334ff2c235f18bc10c817886a098c5');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}