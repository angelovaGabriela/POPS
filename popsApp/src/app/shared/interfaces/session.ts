export type SessionType = 'yoga' | 'pilates';
export type SessionGoal = 'strength' | 'flexibility' | 'recovery';

// Yoga subcategories 
export type YogaStrengthSubcategory = 'power_vinyasa' | 'ashtanga' | 'rocket_yoga';
export type YogaFlexibilitySubcategory = 'yin_yoga' | 'restorative' | 'hatha';
export type YogaRecoverySubcategory = 'nidra' | 'gentle_flow' | 'somatic';

export type YogaSubcategory = | YogaStrengthSubcategory | YogaFlexibilitySubcategory | YogaRecoverySubcategory;

// Pilates subcategories
export type PilatesStrengthSubcategory = 'reformer' | 'mat_pilates' | 'barre_fusion';
export type PilatesFlexibilitySubcategory = 'stretch_pilates' | 'cadillac' | 'foam_roller';
export type PilatesRecoverySubcategory = 'clinical_pilates' | 'prenatal_pilates' | 'low_impact_mat';

export type PilatesSubcategory = | PilatesStrengthSubcategory | PilatesFlexibilitySubcategory | PilatesRecoverySubcategory;

// Both subcategories 
export type Subcategory = YogaSubcategory | PilatesSubcategory;

// Exercise interface
export interface Exercise {
  id: string;
  name: string;
  durationMinutes: number; 
}

// Session interface
export interface Session {
  id?: string;
  name: string;
  description: string;
  detailedDescription: string;
  type: SessionType;
  goal: SessionGoal;
  subcategory: Subcategory;
  durationMinutes: number;
  exercises: Exercise[];
  musicUrl: string;
  createdAt?: Date;
}

export interface SessionData {
  name: string;
  description: string;
  detailedDescription: string;
  type: SessionType;
  goal: SessionGoal;
  subcategory: Subcategory; 
  durationMinutes: number;
  exercises: Exercise[];
  musicUrl: string;
}


// Subcategory Mapping

// YOGA

export const YOGA_SUBCATEGORIES: Record<SessionGoal, { value: YogaSubcategory; label: string }[]> = {
  strength: [
    { value: 'power_vinyasa', label: 'Power Vinyasa' },
    { value: 'ashtanga',      label: 'Ashtanga' },
    { value: 'rocket_yoga',   label: 'Rocket Yoga' },
  ],
  flexibility: [
    { value: 'yin_yoga',    label: 'Yin Yoga' },
    { value: 'restorative', label: 'Restorative Yoga' },
    { value: 'hatha',       label: 'Hatha Yoga' },
  ],
  recovery: [
    { value: 'nidra',       label: 'Yoga Nidra' },
    { value: 'gentle_flow', label: 'Gentle Flow' },
    { value: 'somatic',     label: 'Somatic Yoga' },
  ],
};


// PILATES

export const PILATES_SUBCATEGORIES: Record<SessionGoal, { value: PilatesSubcategory; label: string }[]> = {
  strength: [
    { value: 'reformer',     label: 'Reformer Pilates' },
    { value: 'mat_pilates',  label: 'Mat Pilates' },
    { value: 'barre_fusion', label: 'Barre Fusion' },
  ],
  flexibility: [
    { value: 'stretch_pilates', label: 'Stretch Pilates' },
    { value: 'cadillac',        label: 'Cadillac Pilates' },
    { value: 'foam_roller',     label: 'Foam Roller Flow' },
  ],
  recovery: [
    { value: 'clinical_pilates',  label: 'Clinical Pilates' },
    { value: 'prenatal_pilates',  label: 'Prenatal Pilates' },
    { value: 'low_impact_mat',    label: 'Low Impact Mat' },
  ],
};

// Exercise options based on subcategory 
export const EXERCISE_OPTIONS: Record<Subcategory, string[]> = {

  // Yoga – Strength
  power_vinyasa: ['Sun Salutation A', 'Sun Salutation B', 'Warrior I', 'Warrior II', 'Warrior III',
    'Chair Pose', 'Crow Pose', 'Side Plank', 'Chaturanga', 'Boat Pose', 'Reverse Warrior',
    'Eagle Pose', 'Dolphin Pose', 'Plank Hold', 'High Lunge'],
  ashtanga: ['Surya Namaskar A', 'Surya Namaskar B', 'Standing Forward Fold', 'Triangle Pose',
    'Revolved Triangle', 'Extended Side Angle', 'Parivritta Parsvakonasana', 'Prasarita Padottanasana',
    'Parsvottanasana', 'Utthita Hasta Padangusthasana', 'Ardha Baddha Padmottanasana',
    'Utkatasana', 'Virabhadrasana I', 'Virabhadrasana II', 'Navasana'],
  rocket_yoga: ['Rocket Sun Salutation', 'Handstand Prep', 'Forearm Balance', 'Compass Pose',
    'Flying Pigeon', 'Firefly Pose', 'Eight-Angle Pose', 'Grasshopper Pose',
    'Twisted Lizard', 'Wild Thing', 'King Pigeon', 'Mermaid Pose', 'Scorpion Pose',
    'Peacock Pose', 'Bound Extended Side Angle'],

  // Yoga – flexibility
  yin_yoga: ['Dragon Pose', 'Sleeping Swan', 'Butterfly', 'Dragonfly', 'Caterpillar',
    'Sphinx Pose', 'Seal Pose', 'Deer Pose', 'Half Saddle', 'Saddle Pose',
    'Banana Pose', 'Shoelace', 'Square Pose', 'Melting Heart', 'Snail Pose'],
  restorative: ['Supported Child\'s Pose', 'Legs Up the Wall', 'Supported Bridge', 'Reclining Twist',
    'Supported Savasana', 'Bolster Heart Opener', 'Supported Pigeon', 'Supta Baddha Konasana',
    'Supported Forward Fold', 'Reclined Butterfly', 'Prone Savasana', 'Side-Lying Relaxation',
    'Supported Fish', 'Wall Butterfly', 'Crocodile Pose'],
  hatha: ['Mountain Pose', 'Tree Pose', 'Triangle Pose', 'Half Moon Pose', 'Seated Forward Fold',
    'Pigeon Pose', 'Cobra Pose', 'Bow Pose', 'Camel Pose', 'Bridge Pose',
    'Wheel Pose', 'Shoulder Stand', 'Plow Pose', 'Fish Pose', 'Happy Baby'],

  // Yoga – recovery
  nidra: ['Body Scan', 'Breath Awareness', 'Rotation of Consciousness', 'Visualization',
    'Sankalpa Setting', 'Opposite Sensations', 'Rapid Images', 'Internalization',
    'Stillness Practice', 'Sleep Transition'],
  gentle_flow: ['Cat-Cow', 'Thread the Needle', 'Supine Twist', 'Child\'s Pose', 'Puppy Pose',
    'Standing Side Bend', 'Neck Rolls', 'Shoulder Circles', 'Hip Circles', 'Gentle Backbend',
    'Seated Twist', 'Ankle Circles', 'Wrist Stretches', 'Eye Palming', 'Savasana'],
  somatic: ['Body Scan Flow', 'Spinal Wave', 'Hip Undulation', 'Pandiculation', 'Sensing Walk',
    'Arch & Flatten', 'Side Bend Release', 'Diagonal Release', 'Breathing Expansion',
    'Jaw & Throat Release', 'Shoulder Release', 'Psoas Release', 'Leg Swing', 'Grounding',
    'Integration Rest'],




  // Pilates – strength
  reformer: ['Footwork Series', 'Hundred on Reformer', 'Short Spine', 'Long Spine', 'Elephant',
    'Running', 'Stomach Massage', 'Rowing Series', 'Long Box Pulling Straps', 'Snake',
    'Twist', 'Side Splits', 'Front Splits', 'Down Stretch', 'Up Stretch'],
  mat_pilates: ['The Hundred', 'Roll Up', 'Double Leg Stretch', 'Single Leg Stretch', 'Criss-Cross',
    'Teaser', 'Swan', 'Single Leg Kick', 'Double Leg Kick', 'Side Kick Series',
    'Rolling Like a Ball', 'Open Leg Rocker', 'Corkscrew', 'Saw', 'Shoulder Bridge'],
  barre_fusion: ['Plié Series', 'Relevé Pulses', 'Arabesque Hold', 'Attitude Lifts', 'Tendu Series',
    'Side-Lying Leg Lifts', 'Pretzel', 'Thigh Dancing', 'Flat Back Series', 'Curl Series',
    'Standing Seat Work', 'Wide Second Pulses', 'Inner Thigh Lifts', 'Tricep Dips', 'Spine Stretch'],

  // Pilates – flexibility
  stretch_pilates: ['Spine Stretch Forward', 'Hip Flexor Lunge', 'Figure Four Stretch', 'Mermaid',
    'Thread the Needle', 'Chest Opener', 'Hamstring Stretch', 'IT Band Stretch',
    'Quad Stretch', 'Calf Stretch', 'Wrist Flexor Stretch', 'Neck Side Stretch',
    'Seated Pigeon', 'Cross-Legged Forward Fold', 'Reclined Spinal Twist'],
  cadillac: ['Tower Series', 'Push Through Bar', 'Hanging Pull-Up', 'Leg Springs', 'Arm Springs',
    'Roll-Back Bar', 'Cat Stretch', 'Bridge on Cadillac', 'Chest Expansion', 'Thigh Stretch',
    'High Bridge', 'Reverse Push Through', 'Teaser on Cadillac', 'Flying Eagle', 'Breath Circles'],
  foam_roller: ['Thoracic Extension', 'IT Band Roll', 'Glute Roll', 'Hip Flexor Roll', 'Quad Roll',
    'Lat Roll', 'Upper Back Roll', 'Calf Roll', 'Balance Challenge', 'Plank on Roller',
    'Supine Twist on Roller', 'Chest Opener on Roller', 'Hip Bridge on Roller',
    'Single Leg Balance', 'Core Breathing'],

  // Pilates – recovery
  clinical_pilates: ['Pelvic Floor Activation', 'Transverse Abdominis Engagement', 'Gentle Spine Mobility',
    'Scapular Setting', 'Hip Hinge', 'Clam Shell', 'Bridge with Feedback', 'Knee Fold',
    'Leg Slide', 'Heel Drop', 'Single Leg Lowering', 'Oblique Curl', 'Side-Lying Breathing',
    'Cat Tilt', 'Prone Hip Extension'],
  prenatal_pilates: ['Cat-Cow Modified', 'Pelvic Rocking', 'Clamshell', 'Side-Lying Leg Lift',
    'Seated Side Stretch', 'Modified Bird Dog', 'Wall Squat', 'Standing Hip Circles',
    'Supported Child\'s Pose', 'Chest Opener', 'Ankle Circles', 'Shoulder Rolls',
    'Neck Side Stretch', 'Kegel Series', 'Relaxation Breathing'],
  low_impact_mat: ['Supine Knee to Chest', 'Supine Figure Four', 'Bridge', 'Dead Bug Modified',
    'Side-Lying Clam', 'Seated Forward Fold', 'Gentle Twist', 'Pelvic Tilts',
    'Hip Circles on Back', 'Knee Drops', 'Arm Circles', 'Shoulder Opener',
    'Gentle Neck Stretch', 'Reclined Butterfly', 'Savasana'],
};