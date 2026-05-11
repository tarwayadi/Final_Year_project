// Algorithm theory data for the Algorithms page
const ALGO_INFO = {
  FCFS: {
    name: 'First Come First Served (FCFS)',
    shortName: 'FCFS',
    tag: 'Baseline Scheduler',
    icon: '📋',
    color: '#9CA3AF',
    brief: 'The simplest scheduling approach — tasks are executed in the order they arrive, with no optimization.',
    what: 'FCFS (First Come First Served) is the most basic task scheduling algorithm used in cloud computing. It operates on a simple queue-based principle: the first task to arrive in the scheduling queue is the first to be assigned to an available virtual machine (VM). There is no consideration for task priority, deadline urgency, energy cost, or resource optimization. It serves as the baseline against which more advanced schedulers are measured.',
    steps: [
      'Tasks arrive and are placed in a FIFO (First-In, First-Out) queue.',
      'The scheduler picks the task at the front of the queue.',
      'The task is assigned to the next available Virtual Machine (VM).',
      'Once the VM finishes, the next task in the queue is dispatched.',
      'No reordering, preemption, or optimization occurs at any stage.'
    ],
    features: ['Simple implementation', 'No starvation (all tasks eventually run)', 'Predictable order', 'Non-preemptive', 'No priority awareness', 'No energy optimization', 'High fairness in arrival order'],
    makespan: 'FCFS produces the <strong>highest makespan</strong> among all compared algorithms. Since tasks are not reordered based on execution time or resource needs, shorter tasks may wait behind longer ones (convoy effect), inflating overall completion time.',
    energy: 'Energy consumption is <strong>highest</strong> with FCFS. VMs may remain idle or underutilized while waiting, and no dynamic voltage/frequency scaling (DVFS) is applied. There is no mechanism to consolidate workloads for energy savings.',
    resource: 'Resource utilization is <strong>lowest</strong>. Tasks are blindly assigned without considering VM capacity matching, leading to fragmentation — some VMs are overloaded while others sit nearly idle.',
    formulas: {
      makespan: 'Makespan = max(CT₁, CT₂, ..., CTₙ) where CTⱼ = STⱼ + ETⱼ',
      energy: 'E_total = Σᵢ (P_active × t_exec,i + P_idle × t_idle,i)',
      resource: 'RU = Σ(actual_usage) / Σ(allocated_capacity)',
      core: 'Schedule Order = Arrival_Order(T₁, T₂, ..., Tₙ) — No reordering applied'
    },
    formulaNote: 'FCFS uses no optimization formula. The scheduling order is purely determined by task arrival time. This makes it O(1) per scheduling decision but results in poor overall performance metrics.'
  },

  EDF: {
    name: 'Earliest Deadline First (EDF)',
    shortName: 'EDF',
    tag: 'Deadline-Aware Scheduler',
    icon: '⏰',
    color: '#3B82F6',
    brief: 'Prioritizes tasks with the nearest deadlines, ensuring time-critical jobs are completed first.',
    what: 'EDF (Earliest Deadline First) is a dynamic priority scheduling algorithm where the task with the closest (earliest) deadline is given the highest priority. Originally designed for real-time systems, EDF ensures that urgent tasks are processed before less time-sensitive ones. In cloud environments, it helps reduce deadline violations but does not directly optimize for energy or resource utilization.',
    steps: [
      'All pending tasks are sorted by their deadline (earliest first).',
      'The task with the nearest deadline gets highest priority.',
      'The highest-priority task is assigned to an available VM.',
      'When a new task arrives, the priority queue is re-evaluated.',
      'Tasks with passed deadlines may be dropped or flagged as missed.'
    ],
    features: ['Deadline-aware scheduling', 'Dynamic priority assignment', 'Optimal for uniprocessor real-time systems', 'Reduces deadline miss rate', 'Can be preemptive or non-preemptive', 'No explicit energy optimization', 'Better than FCFS for time-critical workloads'],
    makespan: 'EDF achieves a <strong>moderate reduction</strong> in makespan compared to FCFS (~15% improvement). By prioritizing urgent tasks, it avoids scenarios where critical tasks are blocked by non-urgent ones, but it doesn\'t optimize for overall execution efficiency.',
    energy: 'Energy consumption is <strong>moderately lower</strong> than FCFS but still high. EDF focuses solely on deadlines without considering the energy cost of VM assignments. No DVFS or workload consolidation is applied.',
    resource: 'Resource utilization sees <strong>modest improvement</strong> over FCFS. Deadline-based ordering indirectly leads to better task distribution, but VM selection is still not optimized for capacity matching.',
    formulas: {
      makespan: 'Makespan = max(CTⱼ) where tasks ordered by deadline dⱼ',
      energy: 'E = Σᵢ Pᵢ × tᵢ (no energy-aware VM selection)',
      resource: 'RU = Σ(used_MIPS) / Σ(total_MIPS)',
      core: 'Priority(Tⱼ) = 1 / (dⱼ - t_current) — Earlier deadline = Higher priority'
    },
    formulaNote: 'EDF dynamically computes priority as the inverse of remaining time to deadline. It is provably optimal for single-processor real-time scheduling (Liu & Layland, 1973) but suboptimal in multi-VM cloud environments without energy considerations.'
  },

  'DEELDPQ-SAPSO': {
    name: 'DEEL Dynamic Priority Queue with SA-PSO',
    shortName: 'DEELDPQ-SAPSO',
    tag: 'Hybrid Meta-heuristic Scheduler',
    icon: '🔄',
    color: '#F59E0B',
    brief: 'Combines the DEEL energy model with dynamic priority queues and Self-Adaptive PSO for optimized scheduling.',
    what: 'DEELDPQ-SAPSO is a hybrid scheduling algorithm that integrates three components: the DEEL (Dynamic Energy Efficiency Level) model for energy-aware VM management, Dynamic Priority Queues (DPQ) for intelligent task ordering, and Self-Adaptive Particle Swarm Optimization (SA-PSO) for optimal task-to-VM mapping. It represents a significant advancement over basic schedulers by jointly considering energy, deadlines, and resource efficiency.',
    steps: [
      'Tasks are classified into 4 priority queues (Low, Medium, High, Very High) based on deadline urgency and resource requirements.',
      'The DEEL model computes energy efficiency levels for each VM based on current load and power states.',
      'SA-PSO initializes a swarm of particles, each representing a possible task-to-VM mapping.',
      'Particles iteratively update their positions using self-adaptive inertia weight and cognitive/social coefficients.',
      'The globally best mapping (lowest combined cost of energy + makespan) is selected as the schedule.',
      'Tasks are dispatched according to the optimized mapping with priority queue ordering.'
    ],
    features: ['Energy-aware via DEEL model', 'Dynamic 4-level priority classification', 'PSO-based optimization', 'Self-adaptive inertia weight', 'Considers both deadline and energy', 'Better VM load balancing', 'Scalable to large workloads'],
    makespan: 'DEELDPQ achieves <strong>~26% lower makespan</strong> than FCFS. The PSO optimization finds near-optimal task-VM mappings that minimize overall completion time, while priority queues ensure urgent tasks aren\'t delayed.',
    energy: 'Energy is <strong>significantly reduced</strong> (~48% vs FCFS). The DEEL model actively monitors and manages VM energy states, consolidating workloads to reduce idle power and enabling energy-proportional computing.',
    resource: 'Resource utilization is <strong>substantially improved</strong> (~32% over FCFS). SA-PSO optimizes task placement across VMs to maximize CPU, memory, and bandwidth utilization while avoiding hotspots.',
    formulas: {
      makespan: 'Makespan = max(Σ ETⱼ on VMᵢ) optimized via PSO mapping',
      energy: 'E_DEEL = Σᵢ (α × P_peak × uᵢ + β × P_idle × (1-uᵢ))',
      resource: 'RU = Σ(MIPSⱼ / Capacity_VMᵢ) optimized across all VMs',
      core: 'vᵢ(t+1) = w(t)×vᵢ(t) + c₁r₁(pbest - xᵢ) + c₂r₂(gbest - xᵢ)'
    },
    formulaNote: 'The SA-PSO velocity update equation uses self-adaptive inertia weight w(t) that decreases over iterations for better convergence. c₁ and c₂ are cognitive and social coefficients. The DEEL model\'s α and β parameters balance active vs idle power consumption.'
  },

  EATSD: {
    name: 'Energy-Aware Task Scheduling with Deadline (EATSD)',
    shortName: 'EATSD',
    tag: '⭐ Proposed Algorithm — Best Performance',
    icon: '🚀',
    color: '#0D9488',
    brief: 'The proposed state-of-the-art algorithm combining FLPSO, DEEL model, and DPQ for optimal scheduling.',
    what: 'EATSD (Energy-Aware Task Scheduling with Deadline-constraint) is the algorithm proposed by Ben Alla et al. (2019). It represents the most advanced scheduler in this study, combining three powerful components: Fuzzy Logic-enhanced Particle Swarm Optimization (FLPSO) for intelligent task-to-VM mapping, the DEEL model for energy-efficient VM management, and Dynamic Priority Queues for deadline-aware task ordering. EATSD achieves the best performance across all metrics.',
    steps: [
      'Incoming tasks are analyzed for deadline urgency, computational requirements (MI), and resource demands.',
      'Tasks are dynamically classified into 4 priority queues: Low, Medium, High, and Very High using fuzzy membership functions.',
      'The DEEL model evaluates all VMs for their current energy efficiency level, considering active power, idle power, and utilization.',
      'FLPSO initializes particles representing task-VM mappings, with fuzzy logic adaptively tuning inertia weight and acceleration coefficients.',
      'The fitness function jointly minimizes: makespan + energy consumption + deadline violations, weighted by user-defined preferences.',
      'The optimal mapping is decoded and tasks are dispatched in priority queue order to their assigned VMs.',
      'Continuous monitoring adjusts VM power states (DVFS) based on the DEEL model as workloads change.'
    ],
    features: ['Fuzzy Logic + PSO hybrid optimization', 'DEEL energy efficiency model', 'Dynamic 4-level priority queues', 'Joint optimization of 3 metrics', 'Adaptive parameter tuning', 'DVFS-aware power management', 'Best-in-class across all benchmarks', 'Scalable architecture'],
    makespan: 'EATSD achieves the <strong>lowest makespan</strong> of all algorithms — up to <strong>32.88% lower than FCFS</strong>, 20.59% lower than EDF, and 8.76% lower than DEELDPQ. Fuzzy logic helps FLPSO avoid local optima better than standard PSO.',
    energy: 'EATSD is the <strong>most energy-efficient</strong>, consuming up to <strong>65.88% less energy than FCFS</strong>. The DEEL model combined with FLPSO-optimized VM placement minimizes both active and idle power waste through intelligent workload consolidation.',
    resource: 'Resource utilization is <strong>highest</strong> at up to 0.40 — a <strong>36.23% improvement over FCFS</strong>. FLPSO ensures optimal fit between task requirements and VM capabilities, maximizing CPU/memory/bandwidth usage.',
    formulas: {
      makespan: 'Makespan_EATSD = min(max(CTⱼ)) via FLPSO optimization',
      energy: 'E = Σᵢ[α×P_peak×uᵢ + β×P_idle×(1-uᵢ)] + DVFS adjustment',
      resource: 'RU = max(Σ MIPSⱼ / Cap_VMᵢ) via fuzzy-guided PSO',
      core: 'Fitness(x) = w₁×Makespan(x) + w₂×Energy(x) + w₃×Penalty_deadline(x)'
    },
    formulaNote: 'The EATSD fitness function is a weighted multi-objective function where w₁, w₂, w₃ are user-tunable weights. Fuzzy logic membership functions (triangular/trapezoidal) dynamically adjust PSO parameters based on iteration progress and swarm diversity, enabling superior convergence compared to standard SA-PSO.'
  },

  NEW_ALGO: {
    name: 'New Algorithm (User-Defined)',
    shortName: 'NEW_ALGO',
    tag: 'Custom / Experimental',
    icon: '🧪',
    color: '#8B5CF6',
    brief: 'A placeholder for your own custom algorithm — define and compare against all established schedulers.',
    what: 'NEW_ALGO is a placeholder representing any custom or experimental scheduling algorithm that a researcher or developer wishes to evaluate against the established baselines (FCFS, EDF, DEELDPQ-SAPSO, and EATSD). You can input your algorithm\'s performance data in the "My Algorithm" section to generate comparative charts and PIR% tables. This allows rapid benchmarking of novel approaches against the state-of-the-art.',
    steps: [
      'Design your scheduling algorithm with your chosen optimization strategy.',
      'Run your algorithm on the same benchmark workloads (20, 40, 60, 80, 100 tasks).',
      'Record makespan, energy consumption, and resource utilization for each workload.',
      'Navigate to the "My Algorithm" page and input your recorded data.',
      'The system will automatically generate comparison charts and compute PIR% against all baselines.',
      'Analyze results to determine where your algorithm excels or needs improvement.'
    ],
    features: ['Fully customizable', 'Benchmark against 4 algorithms', 'Auto-generated comparison charts', 'PIR% computation', 'Visual performance overlay', 'Support for execution time data', 'Scalability analysis support'],
    makespan: 'Depends on your algorithm\'s design. Enter your makespan values in the <strong>"My Algorithm"</strong> page to see how your approach compares against EATSD and other baselines across all task counts.',
    energy: 'Depends on your algorithm\'s energy optimization strategy. If your algorithm incorporates <strong>DVFS, workload consolidation, or energy-aware VM selection</strong>, expect lower values. Compare via the custom input form.',
    resource: 'Depends on your algorithm\'s task-to-VM mapping strategy. Algorithms with <strong>intelligent bin-packing or capacity-aware placement</strong> typically achieve higher utilization. Benchmark using the custom form.',
    formulas: {
      makespan: 'Your formula here — e.g., Makespan = f(scheduling_strategy)',
      energy: 'Your formula here — e.g., E = g(power_model, VM_selection)',
      resource: 'Your formula here — e.g., RU = h(placement_policy)',
      core: 'Define your core optimization objective function'
    },
    formulaNote: 'Define your algorithm\'s core scheduling logic and optimization criteria. Use the "My Algorithm" page to input empirical results and compare them visually against all baselines. A good algorithm should aim to minimize makespan and energy while maximizing resource utilization.'
  }
};
