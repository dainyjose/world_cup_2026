import { FlatList, StyleSheet, View, Text } from "react-native";
import { MatchCard } from "@/components/match_card";
import { Match, MatchBucket } from "@/types/match";

export function MatchList({
  matches,
  bucket,
  bottomInset,
}: {
  matches: Match[];
  bucket: MatchBucket;
  bottomInset: number;
}) {
  if (matches.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No matches for this day.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MatchCard
          match={item}
          bucket={bucket}
        />
      )}
      contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    gap: 8,
    paddingTop: 8,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 64,
  },
  emptyText: {
    color: "#60646C",
  },
});
