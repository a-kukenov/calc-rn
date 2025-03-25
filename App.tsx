import { StatusBar } from 'expo-status-bar'
import { useEffect, useState, useRef } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, Animated, View, ScrollView, TextInput } from 'react-native'
import { CustomInput } from './shared/CustomInput'
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from '@expo-google-fonts/nunito';
import Icon from 'react-native-vector-icons/Ionicons';


const lightAccentColor = 'rgb(113, 145, 175)'
const midAccentColor = 'rgb(38, 91, 139)'
const darkAccentColor = 'rgb(14, 50, 83)'
const bgColor = '#FFFBFA'

export default function App() {
	useFonts({
		Nunito_400Regular,
		Nunito_500Medium,
		Nunito_600SemiBold,
		Nunito_700Bold,
		Nunito_800ExtraBold,
		Nunito_900Black,
	  });

	const [answer, setAnswer] = useState('0')
	const [guess, setGuess] = useState('')
	const [hint, setHint] = useState('')
	const [tryings, setTryings] = useState('0')
	const [numbers, setNumbers] = useState<string[]>([])
	const [rotateValue, setRotateValue] = useState(0);
	const [animValues, setAnimValues] = useState<{
		rotate: Animated.Value[],
		scale: Animated.Value[]
	  }>({ rotate: [], scale: [] });

	const sizeAnimValue = useRef(new Animated.Value(1)).current
	const rotateAnimValue = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const newRotateValues = numbers.map(() => new Animated.Value(0));
		const newScaleValues = numbers.map(() => new Animated.Value(1));
		
		setAnimValues({
		  rotate: newRotateValues,
		  scale: newScaleValues
		});
	  }, [numbers.length]);
	   
	  const rotateInAnimation = (index: number) => {
		if (!animValues.rotate[index]) return;
		
		Animated.timing(animValues.rotate[index], {
		  toValue: 360,
		  useNativeDriver: true
		}).start();
		
		setTimeout(() => {
		  Animated.timing(animValues.rotate[index], {
			toValue: 0,
			useNativeDriver: true
		  }).start();
		}, 1000);
	  }
	  
	  const scaleInAnimation = (index: number) => {
		if (!animValues.scale[index]) return;
		
		Animated.timing(animValues.scale[index], {
		  toValue: 1.2,
		  useNativeDriver: true
		}).start();
		
		setTimeout(() => {
		  Animated.timing(animValues.scale[index], {
			toValue: 1,
			useNativeDriver: true
		  }).start();
		}, 1000);
	  }
	const colorAnimValue = sizeAnimValue.interpolate({
		inputRange: [1, 1.2],
		outputRange: ['rgb(14, 50, 83)', 'rgb(38, 91, 139)']
	})

	useEffect(() => {
		const id = rotateAnimValue.addListener(state => {
			setRotateValue(state.value);
		});
		return () => {
			rotateAnimValue.removeListener(id);
		};
	}, []);

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 20) + 1
		setAnswer(randomNumber.toString())
		console.log(randomNumber)
	}, [])

	const checkAnswer = () => {
		if (guess === answer) {
			setNumbers([...numbers, guess])
			setHint('Correct!')
			setTryings(String(Number(tryings) + 1))
		} else if(Number(guess) > Number(answer)) {
			setNumbers([...numbers, guess])
			setHint('Too high')
			setTryings(String(Number(tryings) + 1))
		} else {
			setNumbers([...numbers, guess])
			setHint('Too low')
			setTryings(String(Number(tryings) + 1))
		}
	}

	const setInputValue = (e: any) => {
		if(e.nativeEvent.text === '') {
			setGuess(e.nativeEvent.text)	
		}
		else if (Number(e.nativeEvent.text) > 20 || Number(e.nativeEvent.text) < 1) {
			setGuess(e.nativeEvent.text.slice(0, e.nativeEvent.text.length - 1))
			setHint('Your number must be from 1 to 20')
		} else {
			setGuess(e.nativeEvent.text)
		}
	}

	return (
		<View style={styles.container}>
			<Animated.Text style={[styles.title]}>Guess the Number</Animated.Text>
			<Text style={styles.answer}>{hint}</Text>
			<Text style={styles.tryings}>{tryings}</Text>
			<CustomInput value={guess} onChange={(e) => {setInputValue(e)}} placeholder='0'/>
			<TouchableOpacity style={styles.button} onPress={() => checkAnswer()} >
				<Text style={styles.buttonText}>Guess</Text>
			</TouchableOpacity>
			<View style={styles.box}>
			{numbers.map((number, index) => {
				const colorAnimValue = animValues.scale[index]?.interpolate({
					inputRange: [1, 1.2],
					outputRange: ['rgb(14, 50, 83)', 'rgb(38, 91, 139)']
				}) || 'rgb(14, 50, 83)';
				
				if(number === answer){
					return(
					<Animated.View 
						key={index} 
						style={[
						styles.numberButtonCover, 
						{transform: [{rotate: animValues.rotate[index] ? 
							animValues.rotate[index].interpolate({
							inputRange: [0, 360],
							outputRange: ['0deg', '360deg']
							}) : '0deg'}]}
						]}
					>
						<TouchableOpacity 
						style={styles.numberButton} 
						onPress={() => rotateInAnimation(index)}
						>
						<Text style={styles.numberText}>{number}</Text>
						</TouchableOpacity>
					</Animated.View>
					);
				} else {
					return(
					<Animated.View 
						key={index} 
						style={[
						styles.numberButtonCover, 
						{
							backgroundColor: colorAnimValue,
							transform: [{scale: animValues.scale[index] || 1}]
						}
						]}
					>
						<TouchableOpacity 
						style={styles.numberButton} 
						onPress={() => scaleInAnimation(index)}
						>
						<Text style={styles.numberText}>{number}</Text>
						</TouchableOpacity>
					</Animated.View>
					);
				}
				})}
			</View>

			<StatusBar style='auto' />
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 60,
		flexDirection: 'column',
		height: '100%',
		backgroundColor:  bgColor,
		alignItems: 'center',
	},
	title:{
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 45,
		color: darkAccentColor,
	},
	button:{
		backgroundColor: darkAccentColor,
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		width: '30%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonText:{
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 25,
		color: bgColor,
	},
	answer:{
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 25,
		color: darkAccentColor,
		marginBottom: 10,
	},
	tryings:{
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 35,
		color: darkAccentColor,
		marginBottom: 10,
		position: 'absolute',
		right: 20,
		top: 63,
	},
	box:{
		width: Dimensions.get('window').width - 40,
		height: 820,
		backgroundColor: lightAccentColor,
		borderRadius: 10,
		marginTop: 10,
		gap: 10,
		padding: '2%',
		flexDirection: 'row',
		
	},
	numberButtonCover:{
		width: '18.3%',
		height: '11%',
		backgroundColor: darkAccentColor,
		borderRadius: 10,
	},
	numberButton:{
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	numberText:{
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 45,
		color: bgColor,
	}
})

