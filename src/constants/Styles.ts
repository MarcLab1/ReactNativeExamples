import { StyleSheet } from "react-native";

export const fancyBlue = '#1434A4';

export const styles = StyleSheet.create({

  //alignItems: 'center', // to make items center vertically.
  //justifyContent: 'center' // to make the second item center horizontally.

  container:{
    flex:1,
    paddingVertical: 0,
    paddingHorizontal:5
  },
    appTitleView: {
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
      },
      appTitleText: {
        fontSize: 24,
        fontWeight: '800',
      },
      textInputContainer: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        justifyContent: 'flex-end',
        marginBottom:10
        
      },
      textInput: {
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal:10,
        height: 50,
        margin: 10,
        backgroundColor: 'white',
        borderColor:fancyBlue,
      },
      loadingView: {
        flex: 1,
        justifyContent:'center'
      },
})