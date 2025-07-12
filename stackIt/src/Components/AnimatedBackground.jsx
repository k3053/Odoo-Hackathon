export default function AnimatedBackground() {
    return(
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-green-50 to-yellow-100 opacity-40 animate-pulse"></div>
    </div>
  );
}