// LANGKAH 1: Import semua yang dibutuhkan
import React, { useState, useRef, useEffect } from 'react';
import {
  View,               // 1. Container
  Text,               // 2. Teks
  Image,              // 3. Gambar
  ScrollView,         // 4. Scroll
  FlatList,           // 5. List efisien
  SectionList,        // 6. List berkelompok
  TextInput,          // 7. Input teks
  Button,             // 8. Tombol standar
  TouchableOpacity,   // 9. Tombol dengan fleksibel
  Pressable,          // 10. Tombol fleksibel
  Switch,             // 11. Toggle
  Modal,              // 12. Popup
  ActivityIndicator,  // 13. Loading
  StatusBar,          // 14. Status bar
  SafeAreaView,       // 15. Area aman
  StyleSheet,         // 16. Styling
  Alert,
  Platform,
  KeyboardAvoidingView, // 17. Agar form tidak tertutup keyboard
  Animated,             // 18. API animasi bawaan React Native
} from 'react-native';

const COLORS = {
  bg: '#111827',           // latar belakang
  card: '#1F2937',         // kartu/panel
  cardBorder: '#374151',   // border kartu
  accent: '#DC2626',       // merah tua
  accentLight: '#dc9d9d',  // merah muda
  accentGold: '#f59e0b',   // emas
  text: '#f0f0f0',         // teks utama
  textMuted: '#9ca3af',    // teks redup
  textDim: '#6b7280',      // teks sangat redup
  success: '#4ade80',      // hijau
  white: '#ffffff',
};

const PROFILE = {
  name: 'Dzaky Muhammad Nafis',      
  title: 'Full-Stack Mobile Developer',
  email: 'dzakynafis@mail.uinssc.ac.id',
  phone: '+62 877-0426-1007',
  location: 'Cirebon, Jawa Barat',
  bio: 'Pengembang aplikasi mobile berpengalaman 4 tahun yang berfokus pada React Native & Flutter.',
  avatar: require('./assets/nafis.jpeg'), 
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#22C55E' },
  { id: '2', name: 'Flutter',      level: 75, color: '#F59E0B' },
  { id: '3', name: 'JavaScript',   level: 88, color: '#84CC16' },
  { id: '4', name: 'TypeScript',   level: 80, color: '#84CC16' },
  { id: '5', name: 'Node.js',      level: 70, color: '#F59E0B' },
  { id: '6', name: 'Firebase',     level: 82, color: '#84CC16' },
  { id: '7', name: 'Figma',        level: 55, color: '#EA580C' },
  { id: '8', name: 'HTML/CSS',     level: 60, color: '#F97316' },
  { id: '9', name: 'MySQL',        level: 70, color: '#F59E0B' },
];

const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Mobile Developer',
        company: 'PT. TechVision Indonesia',
        period: '2023 – Sekarang',
        desc: 'Memimpin tim 5 developer dalam pengembangan aplikasi e-commerce mobile.',
    },
    {
        id: 'e2',
        role: 'Installer & Support',
        company: 'CV. Hastama Teknik',
        period: '2022 – Sekarang',
        desc: 'Melakukan instalasi dan maintenance jaringan komputer, CCTV, dan perangkat IT lainnya.',
    },
    {
        id: 'e3',
        role: 'Mobile Developer',
        company: 'Startup Fintech – PayEasy',
        period: '2020 – 2022',
        desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.',
    },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
    {
        id: 'd1',
        role: 'Teknik Komputer & Jaringan',
        company: 'SMKS Global Prima Islamic School',
        period: '2021 – 2024',
        desc: 'Rata-rata nilai rapor 90/100 · Lulus dengan predikat sangat baik.',
      },
      {
        id: 'd2',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 – 2028',
        desc: 'IPK 3.72 / 4.00 · Skripsi: Implementasi ML pada Aplikasi Mobile.',
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', label: 'GitHub',    icon: '🐙', url: 'github.com/dzakytrain' },
  { id: 's2', label: 'LinkedIn',  icon: '💼', url: 'linkedin.com/in/dzakytrain' },
  { id: 's3', label: 'Portfolio', icon: '🌐', url: 'dzakytrain.dev' },
];

const TABS = [
  { key: 'info',   label: 'Info',   icon: '👤' },
  { key: 'skills', label: 'Skills', icon: '🛠️' },
  { key: 'kontak', label: 'Kontak', icon: '✉️' },
];

const SkillCard = ({ item }) => (
  // 1. View → container kartu
  <View style={styles.skillCard}>
    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>
      {/* 2. Text → nama skill */}
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>

    {/* Progress bar: View berlapis */}
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          // width dinamis dari data, warna dari data
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

// ==========================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
// Props: item -> { role, company, period }, onPress
// ==========================
const TimelineCard = ({ item, onPress }) => (
  // 9. TouchableOpacity → tekan untuk buka Modal
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}  // opacity saat ditekan (0-1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail →</Text>
    </View>
  </TouchableOpacity>
);

// ==========================
// APP UTAMA
// ==========================
export default function App() {
  // ------ STATE ------
  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);
  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);
  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);
  // 17. Tab navigasi aktif: 'info' | 'skills' | 'kontak'
  const [activeTab, setActiveTab] = useState('info');

  // 18. Animated: nilai skala avatar untuk animasi "pulse" (mengembang-mengecil)
  const avatarScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (activeTab !== 'info') return;

        avatarScale.setValue(1);

        const pulseAnimation = Animated.loop(
            Animated.sequence([
            Animated.timing(avatarScale, {
                toValue: 1.08,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.timing(avatarScale, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            ])
        );

        pulseAnimation.start();

        return () => {
            pulseAnimation.stop();
        };
    }, [activeTab]);

  // ------ HANDLER FUNCTIONS ------
  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {
    setSelectedItem(item);   // simpan item yang dipilih
    setModalVisible(true);   // tampilkan modal
  };

  // Dipanggil saat tombol "Kirim Pesan" ditekan
  const handleSend = () => {
    // Validasi input tidak boleh kosong
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);   // tampilkan ActivityIndicator
    // Simulasi delay 2 detik (misal: request ke server)
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim`);
    }, 2000);
  };

  return (
    // 14. SafeAreaView → area aman dari notch & home bar
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar → warna latar status bar & style teks ikon */}
      <StatusBar
        backgroundColor="#111827"    // warna latar (Android)
        barStyle="light-content"     // ikon putih (iOS & Android)
      />

      {/* 1. View → container header dengan flexDirection row */}
      <View style={styles.headerBar}>
        {/* 2. Text → judul header */}
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>

        {/* Toggle "Open to Work" */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            🔴 {openToWork ? 'Open' : 'Busy'}
          </Text>
          {/* 11. Switch → toggle on/off */}
          <Switch
            value={openToWork}             // nilai saat ini
            onValueChange={setOpenToWork}  // callback saat diubah
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>

      {/* 5. Tab navigasi sederhana: Info / Skills / Kontak */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, activeTab === tab.key && styles.tabItemActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.8}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 4. KeyboardAvoidingView → agar form "Hubungi Saya" tidak tertutup keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/*
          TAB: INFO (Profil + Riwayat)
        */}
        {activeTab === 'info' && (
        <>
        {/*
          SECTION PROFIL
          Komponen: View, Text, Image
        */}
        <View style={styles.profileSection}>
          {/* 6. Animated.Image → foto profil dengan animasi "pulse" */}
          <Animated.Image
            source={PROFILE.avatar}
             style={[
                styles.avatar,
                {
                transform: [{ scale: avatarScale }],
                },
            ]}
            // resizeMode menentukan cara gambar menyesuaikan ukuran
            // 'cover' = memenuhi area (mungkin terpotong)
            // 'contain' = semua terlihat (mungkin ada ruang kosong)
          />

          {/* Conditional rendering: badge hanya tampil jika openToWork == true */}
          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✅ Open to Work</Text>
            </View>
          )}

          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          {/* Info kontak dalam baris horizontal */}
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
          </View>

          {/* 9. TouchableOpacity → tombol sosial media */}
          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                style={styles.socialBtn}
                key={s.id}
                onPress={() => Alert.alert('🔗 Link', s.url)}
                activeOpacity={0.8}
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 10. Pressable → tombol dengan efek saat ditekan */}
          {/* style bisa berupa fungsi yang menerima { pressed } */}
          <Pressable
            style={styles.downloadBtn}
            onPressIn={() => setPressing(true)}
            onPressOut={() => setPressing(false)}
            onPress={() => Alert.alert('⬇️ Download', 'CV sedang diunduh...')}
          >
            <Text style={styles.downloadBtnText}>
              {pressing ? '⬇️ Mengunduh...' : '⬇️ Download CV (PDF)'}
            </Text>
          </Pressable>
        </View>
        </>
        )}

        {/*
          TAB: SKILLS (Keahlian)
        */}
        {activeTab === 'skills' && (
        <>
        {/*
          SECTION KEAHLIAN
        */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ FlatList: menampilkan list data secara efisien
          </Text>

          {/* 5. FlatList → daftar skill */}
          <FlatList
            data={SKILLS}                                         // array data
            keyExtractor={(item) => item.id}                      // key unik tiap item
            renderItem={({ item }) => <SkillCard item={item} />}  // render tiap item
            scrollEnabled={false}                                 // scroll dihandle ScrollView luar
            ItemSeparatorComponent={() => (                       // komponen pemisah antar item
              <View style={{ height: 8 }} />
            )}
          />
        </View>

        {/*
          SECTION RIWAYAT
        */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📋 Riwayat</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
          </Text>

          {/* 6. SectionList → pengalaman & pendidikan */}
          <SectionList
            sections={SECTIONS}                    // array of { title, data[] }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // TimelineCard punya onPress untuk membuka Modal
              <TimelineCard item={item} onPress={handleCardPress} />
            )}
            // renderSectionHeader: header untuk tiap kelompok
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
        </>
        )}

        {/*
          TAB: KONTAK (Hubungi Saya)
        */}
        {activeTab === 'kontak' && (
        <>
        {/*
          SECTION HUBUNGI SAYA
        */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>✉️ Hubungi Saya</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ TextInput, Button, ActivityIndicator
          </Text>

          {/* 7. TextInput → input nama (single line) */}
          <TextInput
            style={styles.textInput}
            placeholder="Nama Anda"
            placeholderTextColor="#888"
            value={senderName}
            onChangeText={setSenderName}
            returnKeyType="next"
            editable={!sending}
          />

          {/* 7. TextInput → input pesan (multiline = seperti textarea) */}
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Tulis pesan Anda di sini..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline                // aktifkan multiline
            numberOfLines={4}        // tinggi awal 4 baris
            textAlignVertical="top"  // teks mulai dari atas (Android)
            editable={!sending}
          />

          {/* Kondisi: tampilkan loading atau tombol kirim */}
          {sending ? (
            // 13. ActivityIndicator → spinner saat proses
            <View style={styles.loadingRow}>
              <ActivityIndicator size="large" color="#DC2626" />
              <Text style={styles.loadingText}>Mengirim pesan...</Text>
            </View>
          ) : (
            // 8. Button → tombol standar React Native
            <Button
              title="📤 Kirim Pesan"
              color="#DC2626"        // warna tombol
              onPress={handleSend}   // handler saat ditekan
            />
          )}
        </View>
        </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal detail timeline */}
      <Modal
        visible={modalVisible}                          // tampilkan jika true
        animationType="slide"                            // animasi: 'slide', 'fade', 'none'
        transparent                                       // latar transparan (overlay)
        onRequestClose={() => setModalVisible(false)}    // tombol back Android
      >
        {/* Overlay gelap di belakang dialog */}
        <View style={styles.modalOverlay}>
          {/* Kotak dialog */}
          <View style={styles.modalBox}>
            {/* Render isi hanya jika ada item yang dipilih */}
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>{selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}

            {/* Tombol tutup modal */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================
// STYLES
// ==========================
const styles = StyleSheet.create({
  // — LAYOUT DASAR —
  safeArea: {
    flex: 1,                          // isi penuh layar
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  // — HEADER —
  headerBar: {
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between', // anak tersusun ujung kiri & kanan
    alignItems: 'center',            // rata tengah vertikal
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,                    // bayangan (Android)
    shadowColor: '#000',             // bayangan (iOS)
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // — TAB NAVIGASI (Info / Skills / Kontak) —
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',  // indikator tab aktif
  },
  tabItemActive: {
    borderBottomColor: COLORS.accent,  // garis bawah ungu saat tab aktif
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  tabLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: COLORS.text,
    fontWeight: '700',
  },

  // — PROFIL —
  profileSection: {
    alignItems: 'center',           // rata tengah horizontal
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 1,
    borderBottomLeftRadius: 24,     // sudut kiri bawah melengkung
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,               // lingkaran (width/2)
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  // — SOSIAL MEDIA —
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
  },

  // — TOMBOL DOWNLOAD —
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,               // pill shape
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',     // lebih gelap saat ditekan
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // — SECTION BOX (Keahlian & Riwayat & Kontak) —
  sectionBox: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#111827',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 13,
  },

  // — SKILL CARD —
  skillCard: {
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName:    { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#111827',
    borderRadius: 4,
    overflow: 'hidden',              // clip anak yang melampaui batas
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
    // width & backgroundColor diset secara inline (dinamis dari data)
  },

  // — TIMELINE CARD —
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole:    { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod:  { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint:    { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },

  // — FORM KONTAK —
  textInput: {
    backgroundColor: '#111827',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    // Platform.OS membedakan iOS dan Android
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',        // teks mulai dari atas (Android)
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },

  // — MODAL —
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',  // hitam transparan
    justifyContent: 'flex-end',           // konten di bawah
  },
  modalBox: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle:   { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod:  { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc:    { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});
