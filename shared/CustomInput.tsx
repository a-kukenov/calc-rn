import { TextInput, TextInputProps } from 'react-native'

export function CustomInput(props: TextInputProps) {
	return (
		<TextInput
			style={[
				{
					fontFamily: 'Nunito_800ExtraBold',
					borderRadius: 8,
					backgroundColor: 'orange',
					color: 'black',
					height: '100%',
					width: '86%',
					fontSize: 15,
					paddingLeft: 13,
					borderBottomRightRadius: 0,
					borderTopRightRadius: 0,
				},
				props.style
			]}
			{...props}
		/>
	)
}
