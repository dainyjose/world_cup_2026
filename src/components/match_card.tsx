import {
  FlexAlignType,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Match, MatchBucket, Team } from "@/types/match";
import { useState } from "react";

export function MatchCard({
  match,
  bucket,
}: {
  match: Match;
  bucket: MatchBucket;
}) {
  const [expanded, setExpanded] = useState(false);

  const scoreLabel = match.hasScore
    ? `${match.score.home} - ${match.score.away}`
    : "0 - 0";

  const TeamRow = ({
    team,
    alignment,
  }: {
    team: Team;
    alignment: FlexAlignType | undefined;
  }) => {
    return (
      <View style={[styles.teamRow, { alignItems: "center" }]}>
        {team.flag ? (
          <Image
            source={{ uri: team.flag }}
            style={styles.flag}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.flag, styles.flagPlaceholder]} />
        )}
        <Text
          numberOfLines={2}
          style={styles.teamName}
        >
          {team.name}
        </Text>
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
      <View style={styles.teams}>
        <TeamRow
          team={match.home}
          alignment="flex-start"
        />
        <View style={styles.meta}>
          <Text style={styles.score}>{scoreLabel}</Text>
          {bucket !== "today" && (
            <Text style={styles.date}>{match.kickoffDate}</Text>
          )}
          <Text style={styles.kickoffTime}>{match.kickoffTime}</Text>
          <View style={styles.groupBadge}>
            <Text style={styles.groupText}>Group {match.group}</Text>
          </View>
          <Text style={styles.expand}>
            {expanded ? "▲ Hide India Time" : "▼ Show India Time"}
          </Text>

          {expanded && (
            <View style={styles.localTimeContainer}>
              <View style={styles.divider} />

              <Text style={styles.localTimeLabel}>🇮🇳 India Time</Text>
              <Text style={styles.localTime}>{match.indianKickoffTime}</Text>
            </View>
          )}
        </View>
        <TeamRow
          team={match.away}
          alignment="flex-end"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  teams: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  teamRow: {
    gap: 8,
    justifyContent: "space-between",
    flex: 1 / 3,
  },
  flag: {
    width: 40,
    height: 28,
    borderRadius: 4,
  },
  flagPlaceholder: {
    opacity: 0.4,
  },
  teamName: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },
  meta: {
    width: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  date: {
    fontSize: 12,
  },
  kickoffTime: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563EB",
  },

  groupBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
  },

  groupText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4338CA",
  },
  extra: {
    width: "100%",
    marginTop: 10,
  },
  expand: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#D1D5DB",
    marginBottom: 8,
  },

  localTimeContainer: {
    marginTop: 8,
    alignItems: "center",
  },

  localTimeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },

  localTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
  },
});
