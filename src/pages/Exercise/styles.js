import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        marginTop: 40
    },

    title: {
        textAlign: "center",
    },

    question: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1
    },

    group: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },

    answer: {
        minWidth: '30%',
        maxWidth: '50%',
        minHeight: '30%',
        borderWidth: 1,
        padding: 12,
    },

    alternative: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        
    },

    content: {
    },

    box: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;