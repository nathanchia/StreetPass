import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

// Required props: visible
const SpinnerModal = props => {
    return (
        <Modal animationType={'none'} visible={props.visible} transparent={true}>
            <View style={styles.spinner}>
                <ActivityIndicator animating={props.visible} size={'large'} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
   spinner: {
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
   },
})

export default SpinnerModal;