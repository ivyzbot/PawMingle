import Avatar from 'boring-avatars';

export default function UserAvatar({ name }) {
  return (
    <Avatar
      size={60}
      name={name}
      variant="beam"
      colors={['#FCE7D2', '#E0DBBD', '#C0CEAA', '#FD8086', '#EB5874']}
      // square={true}
    />
  );
}
