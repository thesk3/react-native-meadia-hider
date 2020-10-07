import * as React from 'react';

import { Button,ScrollView,Text,TextInput
  , Image, View,BackHandler,TouchableOpacity, StyleSheet,Dimensions,FlatList   } from 'react-native';
import * as Permissions from 'expo-permissions';
import CathceImage from './CathceImage';
import TodoList from './TodoList';
const { height } = Dimensions.get('window');
    
const win = Dimensions.get('window');


const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
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
},
});

export default class ImagePickerExample extends React.Component {
  constructor(props) {
    super(props);
    this.passwordEnter = this.passwordEnter.bind(this);
  }
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
     isVideo:false

  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  
  render() {
    let { image,showImage,fullWidth,imgHeight,imgWidth,screenHeight  } = this.state;
    let { arr } = this.state;

    const scrollEnabled = this.state.screenHeight > height;

      return (
          <View style={styles.MainContainer}>


{this.state.passwordTrue ? (      <View style={styles.MainContainer}>

          
{this.state.passwordTrue ?( <CathceImage/>): <View>
  
  <TextInput
 style={{ height: 40 }}
 placeholder="Type here to translate!"
 onChangeText={text => this.setState({ password:text })}
 />
         <Button title="Ok" onPress={this.passwordEnter} />
</View>  
} 

</View>
):  null       
}
{!(this.state.passwordTrue) && <TodoList passwordEnter={this.passwordEnter}/>}
        
        
        </View>
      );
    
  }

  
  passwordEnter =async () => {
    //console.log("password entred---.",this.state.password);

    this.setState({
      passwordTrue:true
    })
    // if(this.state.password=="Hello"){
    //   this.setState({
    //     passwordTrue:true
    //   })
    // }
  }
  funcCall=async (uri) => {
    console.log("in full show");

    if(uri!=null){
      var str=uri;

      var res = str.substring((str.length-3), (str.length));
  console.log("res---->",res);
    if(res=="png" || res=="jpg" ){
      console.log("open image--->");

      this.setState({
      isImage:true,
      isVideo:false
      })
    
    }
    if(res=="mp4"){
      console.log("open video--->");

      this.setState({
        isVideo:true,
        isImage:false
        })
    }
    
    }
   
    this.setState({
      fullWidth:this.state.fullWidth?false:true
    })
    if(uri!=null){
      this.setState({
        showImage:uri
      })
      Image.getSize(uri, (width, height) => {
        this.setState({imgWidth:width, imgHeight:height})
      console.log("h---->",width);
      console.log("w---->",height);
  
    });
    console.log("state---->",this.state);
    
    }

  //console.log("func call--->",uri);
  }
  componentDidMount() {
    this.getPermissionAsync();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.setState({
      passwordTrue:false
    })

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
      this.storeImage(result.uri);
      console.log("iamge---->",result);
      
    } catch (E) {
      console.log(E);
    }
  };

    
}
