import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  // State untuk menyimpan data profil
  const [profile, setProfile] = useState({
    nama: 'Dzaky Muhammad Nafis',
    nim: '2488010048',
    asalSekolah: 'SMKS Global Prima',
    citaCita: 'Usefull to another people and make a positive impact on the world.',
    rencana:
      'Menajamkan keahlian di bidang teknologi, aktif dalam kegiatan sosial, serta membangun solusi perangkat lunak yang dapat menyelesaikan masalah nyata di masyarakat.',
  });

  // State untuk mode edit (Form atau Preview)
  const [isEditing, setIsEditing] = useState(false);

  // Temporary state saat melakukan pengeditan
  const [form, setForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile(form);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Profil Saya</Text>
            <Text style={styles.headerSubtitle}>
              {isEditing ? 'Ubah Informasi Profil' : 'Informatics student'}
            </Text>
          </View>


          {!isEditing ? (
            /* ================= MODE TAMPILAN PROFIL ================= */
            <View style={styles.card}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {profile.nama ? profile.nama.charAt(0).toUpperCase() : '?'}
                  </Text>
                </View>
                <Text style={styles.profileName}>
                  {profile.nama || 'Nama Belum Diisi'}
                </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>NIM: {profile.nim || '-'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>ASAL SEKOLAH</Text>
                <Text style={styles.infoValue}>
                  {profile.asalSekolah || '-'}
                </Text>

                <Text style={styles.infoLabel}>CITA-CITA</Text>
                <Text style={styles.infoValueHighlight}>
                  🎯 {profile.citaCita || '-'}
                </Text>

                <Text style={styles.infoLabel}>RENCANA MENCAPAI CITA-CITA</Text>
                <View style={styles.quoteBox}>
                  <Text style={styles.quoteText}>
                    "{profile.rencana || '-'}"
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setForm({ ...profile });
                  setIsEditing(true);
                }}
              >
                <Text style={styles.editButtonText}>Edit Informasi</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* ================= MODE FORM EDIT ================= */
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  value={form.nama}
                  onChangeText={(text) => setForm({ ...form, nama: text })}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>NIM</Text>
                <TextInput
                  style={styles.input}
                  value={form.nim}
                  keyboardType="numeric"
                  onChangeText={(text) => setForm({ ...form, nim: text })}
                  placeholder="Masukkan NIM"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Asal Sekolah</Text>
                <TextInput
                  style={styles.input}
                  value={form.asalSekolah}
                  onChangeText={(text) =>
                    setForm({ ...form, asalSekolah: text })
                  }
                  placeholder="Masukkan asal sekolah (SMA/SMK)"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cita-Cita</Text>
                <TextInput
                  style={styles.input}
                  value={form.citaCita}
                  onChangeText={(text) => setForm({ ...form, citaCita: text })}
                  placeholder="Impian/Cita-cita kamu"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Rencana Mencapai Cita-Cita</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={form.rencana}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => setForm({ ...form, rencana: text })}
                  placeholder="Tuliskan langkah-langkah rencanamu..."
                  placeholderTextColor="#94a3b8"
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark theme background
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  /* Profile View Styling */
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  badgeText: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 16,
  },
  infoSection: {
    gap: 12,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 15,
    color: '#cbd5e1',
    fontWeight: '500',
    marginBottom: 8,
  },
  infoValueHighlight: {
    fontSize: 16,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quoteBox: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginTop: 4,
  },
  quoteText: {
    color: '#e2e8f0',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  editButton: {
    marginTop: 24,
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#f8fafc',
    fontWeight: '600',
  },
  /* Form Styling */
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#f8fafc',
    fontSize: 15,
  },
  textArea: {
    minHeight: 90,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#334155',
  },
  cancelButtonText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2563eb',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});