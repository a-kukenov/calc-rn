import { StatusBar } from 'expo-status-bar'
import { useEffect, useState, useRef } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, Animated, View, ScrollView, TextInput } from 'react-native'
import { CustomInput } from './shared/CustomInput'
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from '@expo-google-fonts/nunito';
import Icon from 'react-native-vector-icons/Ionicons';


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
	const [firstNumber, setFirstNumber] = useState('')
	const [secondNumber, setSecondNumber] = useState('')
	const [operator, setOperator] = useState('')
	const [display, setDisplay] = useState('0')

	const scaleAnim = useRef(new Animated.Value(1)).current
	const sweepAnim = useRef(new Animated.Value(0)).current
	const sweepResultAnim = useRef(new Animated.Value(0)).current
	
	const scaleInAnimation = () => {
		Animated.timing(scaleAnim, {
			toValue: 1.2,
			duration: 150,
			useNativeDriver: true
		}).start() 
	}
	const scaleOutAnimation = () => {
		Animated.timing(scaleAnim, {
			toValue: 1,
			duration: 80,
			useNativeDriver: true 
		}).start() 
	}

	const sweepInAnimation = () => {
		Animated.timing(sweepAnim, {
			toValue: -75,
			duration: 300,
			useNativeDriver: true
		}).start() 
	}
	const sweepOutAnimation = () => {
		Animated.timing(sweepAnim, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true
		}).start() 
	}
	const sweepResultAnimation = () => {
		Animated.timing(sweepResultAnim, {
			toValue: 480,
			duration: 500,
			useNativeDriver: true
		}).start()
		setTimeout(() => {
			Animated.timing(sweepResultAnim, {
				toValue: -510,
				duration: 1,
				useNativeDriver: true
			}).start()
		}, 500);
		setTimeout(() => {
			Animated.timing(sweepResultAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}).start()
		}, 600);
	}

	useEffect(() => {
		if(display === ''){
			setDisplay('0')
		}
	}, [display])
	
	const handleNumber = (number: string) => {
		if (operator === '') {
			if(number === '.' && firstNumber === '') {
				setFirstNumber(0 + number)
				setDisplay(0 + number)
			} else{
				setFirstNumber(firstNumber + number)
				setDisplay(firstNumber + number)
			}
		} else {
			if(number === '.' && secondNumber === '') {
				setSecondNumber(0 + number)
				setDisplay(0 + number)
			} else{
				setSecondNumber(secondNumber + number)
				setDisplay(secondNumber + number)
			}
		}
	}
	const handleClearEverything = () => {
		setFirstNumber('')
		setSecondNumber('')
		setOperator('')
		setDisplay('0')
	}
	const handleOperator = async(operator: string) => {
		if(secondNumber !== '') {
			handleCount()
			setTimeout(() => {
				setOperator(operator)
				setDisplay(display + operator)
			}, 1000)
			// setOperator(operator)
			// setDisplay(display + operator)
		} 
		else if(firstNumber !== '') {
			setOperator(operator)
			setDisplay(firstNumber + operator)
		}
	}	
	const handleDelete = () => {
		if(secondNumber !== '') {
			setSecondNumber(secondNumber.slice(0, -1))
			setDisplay(secondNumber.slice(0, -1))
		} else {
			setFirstNumber(firstNumber.slice(0, -1))
			setDisplay(firstNumber.slice(0, -1))
		}
	}
	const handleCount = () => {
		if(secondNumber !== '') {
			if(operator === '+') {
				setFirstNumber(String(Number(firstNumber) + Number(secondNumber)))
				setSecondNumber('')
				sweepResultAnimation()
				setTimeout(() => {
					setDisplay(String(Number(firstNumber) + Number(secondNumber)))
				}, 500);
			} else if(operator === '-') {
				setFirstNumber(String(Number(firstNumber) - Number(secondNumber)))
				setSecondNumber('')
				sweepResultAnimation()
				setTimeout(() => {
					setDisplay(String(Number(firstNumber) - Number(secondNumber)))
				}, 500);
			} else if(operator === 'x') {
				setFirstNumber(String(Number(firstNumber) * Number(secondNumber)))
				setSecondNumber('')
				sweepResultAnimation()
				setTimeout(() => {
					setDisplay(String(Number(firstNumber) * Number(secondNumber)))
				}, 500);
			} else if(operator === '/') {
				setFirstNumber(String(Number(firstNumber) / Number(secondNumber)))
				setSecondNumber('')
				sweepResultAnimation()
				setTimeout(() => {
					setDisplay(String(Number(firstNumber) / Number(secondNumber)))
				}, 500);
			} else if(operator === '^') {
				setFirstNumber(String(Number(firstNumber) ** Number(secondNumber)))
				setSecondNumber('')
				sweepResultAnimation()
				setTimeout(() => {
					setDisplay(String(Number(firstNumber) ** Number(secondNumber)))	
				}, 500);
			}
		}
	}
	const handlePercent = () => {
		if(secondNumber !== '') {
			setSecondNumber(String(Number(secondNumber) / 100))
			setDisplay(String(Number(secondNumber) / 100))
		} else {
			setFirstNumber(String(Number(firstNumber) / 100))
			setDisplay(String(Number(firstNumber) / 100))
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.answerBox}>
				<Animated.Text style={[styles.answer, {transform: [{translateX: sweepResultAnim}]}]}>{display}</Animated.Text>
			</View>
			<View style={styles.buttonBox}>
				<TouchableOpacity style={styles.buttonRed} onPress={() => handleClearEverything()}>
					<Text style={styles.buttonText}>AC</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('^')}>
					<Text style={styles.buttonText}>^</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonOrange} onPress={() => handlePercent()}>
					<Text style={styles.buttonText}>%</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('/')}>
					<Text style={styles.buttonText}>/</Text>
				</TouchableOpacity>

	
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('7')}>					
					<Text style={[styles.buttonText]}>7</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('8')}>
					<Text style={styles.buttonText}>8</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('9')}>
					<Text style={styles.buttonText}>9</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('x')}>
					<Text style={styles.buttonText}>X</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => handleNumber('4')}>
					<Text style={styles.buttonText}>4</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('5')}>
					<Text style={styles.buttonText}>5</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('6')}>
					<Text style={styles.buttonText}>6</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('-')}>
					<Text style={styles.buttonText}>-</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => handleNumber('1')}>
					<Text style={styles.buttonText}>1</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('2')}>
					<Text style={styles.buttonText}>2</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('3')}>
					<Text style={styles.buttonText}>3</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonOrange} onPress={() => handleOperator('+')}>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => handleNumber('0')}>
					<Text style={styles.buttonText}>0</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleNumber('.')}>
					<Text style={styles.buttonText}>,</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleDelete()} onPressIn={() => sweepInAnimation()} onPressOut={() => sweepOutAnimation()}>
					<Animated.Text style={[styles.buttonText, {transform: [{translateX: sweepAnim}]}]}><Icon name='arrow-back' size={45}/></Animated.Text>
				</TouchableOpacity>
				<Animated.View style={[styles.buttonCover, {transform: [{scale: scaleAnim}]}]}>
					<TouchableOpacity style={styles.buttonGreen} onPress={() => handleCount()} onPressIn={() => scaleInAnimation()} onPressOut={() => scaleOutAnimation()}>
						<Text style={styles.buttonText}>=</Text>
					</TouchableOpacity>
				</Animated.View>
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
		backgroundColor: '#FFFBFA',
		alignItems: 'center',
	},
	box: {
		width: 100,
		height: 100,
		backgroundColor: 'blue'
	},
	answerBox:{
		// borderWidth: 2,
		borderColor: 'white',
		width: Dimensions.get('window').width - 40,
		height: Dimensions.get('window').height / 3,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		// overflow: 'hidden',
	},
	answer:{
		color: '#00203E',
		fontSize: 120,
		fontFamily: 'Nunito_800ExtraBold',
		textAlign: 'right',
		marginRight: 10,
	},
	buttonBox:{
		marginTop: 20,
		width: Dimensions.get('window').width - 40,
		height: Dimensions.get('window').height - Dimensions.get('window').height / 3 - 100,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 13,
	},
	buttonCover:{
		borderRadius: 30,
		backgroundColor: 'rgb(113, 145, 175)',
		width: '23%',
		height: '17%',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	button:{
		borderRadius: 30,
		backgroundColor: 'rgb(113, 145, 175)',
		width: '23%',
		height: '17%',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	buttonRed:{
		backgroundColor: 'rgb(38, 91, 139)',
		width: '23%',
		height: '17%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
	buttonOrange:{
		backgroundColor:'rgb(14, 50, 83)',
		width: '23%',
		height: '17%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
	buttonGreen:{
		backgroundColor:'rgb(38, 91, 139)',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
	},
	buttonText:{
		fontSize: 45,
		color: '#FFFBFA',
		fontFamily: 'Nunito_700Bold',
	}
})

