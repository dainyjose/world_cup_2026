import { View, Image, Text, StyleSheet, ImageBackground } from "react-native";

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require("@/assets/splashScreen.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Optional dark overlay */}
      <View style={styles.overlay}>
        <Image
          source={require("@/assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>World Cup 2026</Text>

        <Text style={styles.subtitle}>
          Live Scores • Fixtures • Groups • Teams
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(8,27,58,0.55)", // dark overlay
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  logo: {
    width: 190,
    height: 190,
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#D9E7FF",
    textAlign: "center",
  },
});
