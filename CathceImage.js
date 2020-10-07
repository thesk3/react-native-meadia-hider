import React, { Component } from 'react'

import { Button,ScrollView,Text,TextInput
  , Image, View,BackHandler,TouchableOpacity, StyleSheet,Dimensions,FlatList   } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
const { height,width } = Dimensions.get('window');
    
const win = Dimensions.get('window');

const { width1: DEVICE_WIDTH, height1: DEVICE_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },image: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.height,
}, controlBar: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 45,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}, controlBar1: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top:'50%',
  height: 90,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  color:"white",
  backgroundColor: "whitesmoke",
}
})
class CathceImage  extends Component {
    state = {
        image: null,
        arr:[],
        fullWidth:false,
        showImage:null,
        imgHeight:0,
         imgHeight:0,
         screenHeight: 0,
         password:null,
         passwordTrue:false,
         isImage:false,
         isVideo:false,
         useNativeControls:false,
          mute: false,
         shouldPlay: true,
         showConfirmDelete:false
          };
      onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight });
      };
    
      handlePlayAndPause = () => {  
        this.setState((prevState) => ({
           shouldPlay: !prevState.shouldPlay  
        }));
      }
      
      handleVolume = () => {
        this.setState(prevState => ({
          mute: !prevState.mute,  
        }));
      }
            render() {
        let { image, isImage,isVideo, showImage,fullWidth,imgHeight,imgWidth,screenHeight  } = this.state;
        let { arr } = this.state;
    
        const scrollEnabled = this.state.screenHeight > height;
    
    
        if(this.state.arr.length!=0){
          const data = this.state.arr.map((link) =>
          <View ><Text>{link}</Text> </View>
    
          )}
          return (
            <View style={styles.MainContainer}>
               
               {!(this.state.fullWidth) ? (<Button title="Pick an image from camera roll" onPress={this._pickImage} />):null}
               
                      
                      {!(this.state.fullWidth) ?
              (<FlatList
                data={arr}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                  <TouchableOpacity  onPress={()=>this.funcCall(item)}>
    
                    <Image style={styles.imageThumbnail} source={{ uri: item }} /></TouchableOpacity>
                  </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
              />):null}
               {this.state.isImage  && this.state.fullWidth  ? (
                             <View style={{ flex: 1, justifyContent: 'center',height:height }}>
                             
                             <Image 
                             style={{ width: 400, height:height}}
                             resizeMode={'contain'} 
                source={{
                  uri: showImage,
                }}
                                        />
                               <View style={styles.controlBar}>
                                 {/* <Button            title="Delete" onPress={()=>this.confirmDeleteItem(showImage)} ></Button> */}
                                 <AntDesign name="delete" size={24} onPress={()=>this.confirmDeleteItem(showImage)}  color="white" />
                                 </View>
                  {this.state.showConfirmDelete && <View style={styles.controlBar1}>
                  <Button            title="Cancel" onPress={()=>this.confirmDeleteItem(showImage)} >Cancel</Button>
                  <Button           title="Delete"  onPress={()=>this.deleteItem(showImage)}>Confirm Delete</Button>
                                 
                                 
                                 </View>
               }
                                 
               
                           </View>
               
               
    
            ) : null}  




            {this.state.isVideo  && this.state.fullWidth  ? (
                             <View style={{ flex: 1,padding:1, justifyContent: 'center',height:height }}>
                             <TouchableOpacity  >
                             <Video
  source={{ uri: showImage }}
  rate={1.0}
  volume={1.0}
  isMuted={this.state.mute}
  resizeMode="cover"
  shouldPlay={this.state.shouldPlay}
  isLooping
  useNativeControls={true}
  onReadyForDisplay={params => {
    //params.naturalSize.orientation = "portrait";
    console.log("params---->",params.naturalSize.orientation);
  }}
  style={{ width: width, height: 300 }}
  />
      <View style={styles.controlBar}><Text style={{color:' white'}} onPress={()=>this.deleteItem(showImage)}>Delete</Text></View>

                                        </TouchableOpacity>
                           </View>
               
    
            ) : null}  

               {!(this.state.fullWidth) ? (    <Button title="Get All Image" onPress={this.importAllImage} /> 
):null}
    
    
            </View>
          );
        
        
      }
      onReadyForDisplay () {
        console.log("dislpyyyyyy");
      }
      deleteItem=async (uri) => {
        console.log("uri t delete--->",uri);
        var a=await FileSystem.deleteAsync(uri)
          console.log("a----->",a);
          this.setState({showConfirmDelete:this.state.showConfirmDelete?false:true})
          this.setState({
            fullWidth:this.state.fullWidth?false:true
          })
        
        }      
        confirmDeleteItem=async (uri) => {
          this.setState({showConfirmDelete:this.state.showConfirmDelete?false:true})
          }      
         funcCall=async (uri) => {
    console.log("in full show catch iamge----->");

    if(uri!=null){
      var str=uri;

      var res = str.substring((str.length-3), (str.length));
      console.log("res---->",res);

    if(res=="png" || res=="jpg" ){
      console.log("open imge catch iamge--->");
     
      this.setState({isVideo:false})
      this.setState({isImage:true})
    
    }
    if(res=="mp4"){
      console.log("open video--->");
     
    
      this.setState({isVideo:true})
      this.setState({isImage:false})
    
    }
    
    }
    
  this.setState({
    fullWidth:this.state.fullWidth?false:true
  })
  if(uri!=null){
    this.setState({
      showImage:uri
    })
  // });
  console.log("state---->",this.state);
  
  }

//console.log("func call--->",uri);
}



componentDidMount() {
  this.getPermissionAsync();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  try {
    var n= FileSystem.getInfoAsync(FileSystem.documentDirectory + 'images1/')
        n.then( (val) => {console.log("asynchronous logging has val:",val.exists)
            
            if(!(val.exists)){

                this.createDirec();
            }
        } );
    } catch (error) {
        console.log("catch----->",error);
    }


}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick= async ()=> {
//this.props.navigation.goBack(null);
//BackHandler.exitApp();
//return true;
let t=this.state.fullWidth;
console.log("back clicked--->",t);

if(t==true){
  this.setState({
    fullWidth:this.state.fullWidth?false:true
  })
return true;  
}else{
  BackHandler.exitApp()
}

}

fullShow=async (url) => {
 
  this.setState({
    fullWidth:true,
    showImage:url
  })

  console.log("fuul width---->",this.state);    

}
 importAllImage=async () => {
  //console.log("in import",FileSystem.documentDirectory);

  
var cont=await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'images1/');
 var tpath=FileSystem.documentDirectory+'images1/';
 for (const key in cont) {
  // console.log("key---->",cont[key]);
   cont[key]=tpath+cont[key];
  }
  console.log("content12----->",cont);
   this.setState({ arr: cont });
  
}
async createDirec(){
    let n=await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images1/')

}
async storeImage(result){
  let {uri,type}=result;
  console.log("imga---->",result.uri);
  let sp=uri.split(".");
  console.log("split---->",sp[1]);
if(type=="image"){
  var nf =await FileSystem.moveAsync({
    from: uri,
    to: FileSystem.documentDirectory + 'images1/'+shorthash.unique(uri)+'.jpg'
    })
     console.log("nf----->",nf);
   
}
if(type=="video"){
  var nf =await FileSystem.moveAsync({
    from: uri,
    to: FileSystem.documentDirectory + 'images1/'+shorthash.unique(uri)+'.mp4'
    })
     console.log("nf----->",nf);
   
}

  
}


getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};
_pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image:result.uri });
    }
    console.log("imga---->",result);
 
    this.storeImage(result);
    
  } catch (E) {
    console.log(E);
  }
};

_onUseNativeControlsPressed = () => {
  this.setState({ useNativeControls: !this.state.useNativeControls });
};
}


export default CathceImage;