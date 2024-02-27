import Avatar from 'boring-avatars';

export default function UserAvatar({ name, size }) {
  return (
    <Avatar
      size={size}
      name={name}
      variant="beam"
      // colors={['#FCE7D2', '#E0DBBD', '#C0CEAA', '#FD8086', '#EB5874']}
      colors={['#8E407A', '#FE6962', '#F9BA84', '#EEE097', '#FFFFE5']}
      // square={true}
    />
  );
}
