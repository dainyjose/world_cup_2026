import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MatchList } from "@/components/match_list";

import {
  BUCKET_LABELS,
  BUCKET_ORDER,
  useMatchesStore,
} from "@/store/use_matches_store";

export default function HomeScreen() {
  const status = useMatchesStore((state) => state.status);
  const error = useMatchesStore((state) => state.error);
  const selectedBucket = useMatchesStore((state) => state.selectedBucket);
  const setSelectedBucket = useMatchesStore((state) => state.setSelectedBucket);
  const matches = useMatchesStore(
    (state) => state.grouped[state.selectedBucket],
  );
  const fetchMatches = useMatchesStore((state) => state.fetchMatches);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "left", "right"]}
      >
        <Text style={styles.title}>World Cup 2026</Text>

        <SegmentedControl
          values={BUCKET_ORDER.map((bucket) => BUCKET_LABELS[bucket])}
          selectedIndex={BUCKET_ORDER.indexOf(selectedBucket)}
          onChange={(event) =>
            setSelectedBucket(
              BUCKET_ORDER[event.nativeEvent.selectedSegmentIndex],
            )
          }
          tintColor={"#bbbdcd"}
          style={styles.segmented}
          screenReaderFocusable
        />

        <View style={styles.body}>
          {status === "loading" ? (
            <View style={styles.center}>
              <ActivityIndicator />
            </View>
          ) : status === "error" ? (
            <View style={styles.center}>
              <Text style={styles.errorText}>
                {error ?? "Could not load matches."}
              </Text>
              <Pressable
                onPress={fetchMatches}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <View style={styles.retryButton}>
                  <Text style={styles.tryAgainText}>Try again</Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <MatchList
              matches={matches}
              bottomInset={(Platform.OS == "ios" ? 50 : 80) + 24}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    paddingTop: 8,
    fontSize: 30,
    lineHeight: 44,
    fontWeight: 600,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  segmented: {
    width: "100%",
  },
  body: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingBottom: 64,
  },
  errorText: {
    textAlign: "center",
    color: "#60646C",
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 32,
    backgroundColor: "#F0F0F3",
  },
  tryAgainText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  pressed: {
    opacity: 0.7,
  },
});
