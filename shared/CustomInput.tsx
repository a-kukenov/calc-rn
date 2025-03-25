import { TextInput, TextInputProps } from 'react-native'

export function CustomInput(props: TextInputProps) {
	return (
		<TextInput
			style={[
				{
					fontFamily: 'Nunito_800ExtraBold',
					borderRadius: 10,
					backgroundColor: 'rgb(14, 50, 83)',
					color: '#FFFBFA',
					height: '9%',
					width: '40%',
					fontSize: 60,
					paddingLeft: 10,
					textAlign: 'center',
				},
				props.style
			]}
			{...props}
		/>
	)
}
