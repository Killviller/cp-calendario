/**
 * CALENDÁRIO DE PUBLICAÇÕES + CMS
 * Versão: Final Integrada (CP 103, 113, 137, 139 + Fases + Gerador HTML)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================================
    // 1. UTILITÁRIOS
    // ============================================================================
    const Utils = {
        formatDateISO: (date) => {
            if (!date) return '';
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        isToday: (year, month, day) => {
            const today = new Date();
            return today.getFullYear() === year &&
                   today.getMonth() === month &&
                   today.getDate() === day;
        }
    };

    // ============================================================================
    // 2. ESTADO DA APLICAÇÃO E DOM
    // ============================================================================
    const AppState = {
        currentDate: new Date(), 
        selectedChamadaId: "all",
        selectedTipo: "all",
        selectedDate: Utils.formatDateISO(new Date())
    };

    const DOM = {
        // Filtros e Header
        chamadaSelect: document.getElementById('chamada-select'),
        tipoSelect: document.getElementById('tipo-select'),
        notificationBell: document.getElementById('notification-bell'),
        // Calendário
        currentMonthYear: document.getElementById('current-month-year'),
        calendarWeekdays: document.getElementById('calendar-weekdays'),
        calendarGrid: document.getElementById('calendar-grid'),
        agendaView: document.getElementById('agenda-view'),
        viewBtnMonth: document.getElementById('view-btn-month'),
        viewBtnAgenda: document.getElementById('view-btn-agenda'),
        prevMonthBtn: document.getElementById('prev-month'),
        nextMonthBtn: document.getElementById('next-month'),
        // Detalhes
        detailsContainer: document.getElementById('details-container'),
        selectedDateDisplay: document.getElementById('selected-date-display'),
        eventList: document.getElementById('event-list'),
        // Modal Texto
        modal: document.getElementById('text-generator-modal'),
        modalCloseBtn: document.getElementById('close-modal'),
        modalEventTitle: document.getElementById('modal-event-title'),
        generatedText: document.getElementById('generated-text'),
        copyTextBtn: document.getElementById('copy-text-btn'),
        // Admin
        btnAdmin: document.getElementById('admin-btn'),
        modalList: document.getElementById('admin-list-modal'),
        adminList: document.getElementById('admin-chamada-list'),
        btnCloseList: document.querySelectorAll('.close-admin-modal'),
        btnNewChamada: document.getElementById('btn-new-chamada'),
        btnReset: document.getElementById('btn-reset-data'),
        // Admin Forms
        modalChamadaForm: document.getElementById('admin-chamada-form-modal'),
        formChamada: document.getElementById('chamada-form'),
        btnCloseChamadaForm: document.querySelectorAll('.close-form-modal'),
        modalEvents: document.getElementById('admin-events-list-modal'),
        eventsList: document.getElementById('admin-event-list'),
        eventsTitle: document.getElementById('events-manager-title'),
        btnCloseEvents: document.querySelectorAll('.close-events-modal'),
        btnNewEvent: document.getElementById('btn-new-event'),
        modalEventForm: document.getElementById('admin-event-form-modal'),
        formEvent: document.getElementById('event-form'),
        btnCloseEventForm: document.querySelectorAll('.close-event-form-modal')
    };

    // ============================================================================
    // 3. DADOS PADRÃO (SEED)
    // ============================================================================
    const defaultData = [
        {
            id: "cp_103_2025",
            nome: "CHAMADA PÚBLICA Nº 103/2025",
            nomeCurto: "CP 103/2025",
            cssClass: "dot-cp-103",
            linkEdital: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/09/CP103.25-Edital.pdf",
            linkRecursoForm: "https://forms.gle/jm6sJ9u3fd4ECZWD8",
            proposito: "seleção de Assistente à Docência para atuar nos polos de apoio presencial do Sistema Universidade Aberta do Brasil no Estado do Ceará.",
            eventos: [
                { id: "cp103_1", data: "2025-09-22", tipo: "INSCRICAO", titulo: "Publicação do Edital", comunicadoNum: "240/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/09/CP103.25-Edital.pdf", linkForm: "https://forms.gle/jrtFRNUurMG2fVJ46" },
                { id: "cp103_2", data: "2025-10-10", tipo: "INSCRICAO", titulo: "Término das Inscrições", comunicadoNum: "241/2025" },
                { id: "cp103_3", data: "2025-10-13", tipo: "INSCRICAO", titulo: "Resultado Preliminar das Inscrições", comunicadoNum: "242/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP103.25-Resultado_preliminar_inscricao.pdf" },
                { id: "cp103_4", data: "2025-10-14", tipo: "INSCRICAO", titulo: "Recurso ao Resultado Preliminar das Inscrições", comunicadoNum: "243/2025" },
                { id: "cp103_5", data: "2025-10-16", tipo: "INSCRICAO", titulo: "Resultado Definitivo das Inscrições", comunicadoNum: "244/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP103.25-Resultado-definitivo-inscrição-.pdf" },
                { id: "cp103_6", data: "2025-10-17", tipo: "ANALISE_CURRICULO", titulo: "Início - Análise do currículo" },
                { id: "cp103_7", data: "2025-10-22", tipo: "ANALISE_CURRICULO", titulo: "Término - Análise do currículo" },
                { id: "cp103_8", data: "2025-10-23", tipo: "ANALISE_CURRICULO", titulo: "Resultado Preliminar da Análise de Currículo", comunicadoNum: "245/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP103.25-Resultado-Preliminar-Curriculo.pdf" },
                { id: "cp103_9", data: "2025-10-24", tipo: "ANALISE_CURRICULO", titulo: "Recurso ao Resultado Preliminar da Análise de Currículo", comunicadoNum: "246/2025" },
                { id: "cp103_10", data: "2025-10-27", tipo: "ANALISE_CURRICULO", titulo: "Recurso ao Resultado Preliminar da Análise de Currículo", comunicadoNum: "246/2025" },
                { id: "cp103_11", data: "2025-10-28", tipo: "ANALISE_CURRICULO", titulo: "Resultado Definitivo da Análise de Currículo", comunicadoNum: "247/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP103.25-Resultado-Definitivo-Curriculo.pdf" },
                { id: "cp103_11a", data: "2025-10-28", tipo: "ENTREVISTA", titulo: "Convocação para Entrevistas", comunicadoNum: "248/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP103.25-Convocacao-Entrevistas_.pdf" },
                { id: "cp103_12", data: "2025-10-29", tipo: "ENTREVISTA", titulo: "Início - Realização das Entrevistas" },
                { id: "cp103_13", data: "2025-11-04", tipo: "ENTREVISTA", titulo: "Término - Realização das Entrevistas" },
                { id: "cp103_14", data: "2025-11-06", tipo: "ENTREVISTA", titulo: "Resultado Preliminar das Entrevistas", comunicadoNum: "249/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP103.25-Resultado-Preliminar-Entrevistas.pdf" },
                { id: "cp103_15", data: "2025-11-07", tipo: "ENTREVISTA", titulo: "Recurso ao Resultado Preliminar das Entrevistas", comunicadoNum: "250/2025" },
                { id: "cp103_16", data: "2025-11-10", tipo: "ENTREVISTA", titulo: "Resultado Definitivo das Entrevistas", comunicadoNum: "251/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP103.25-Resultado-Definitivo-Enntrevistas.pdf" },
                { id: "cp103_17", data: "2025-11-12", tipo: "FINAL", titulo: "Resultado Final Preliminar", comunicadoNum: "252/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP103.25-Resultado-Final-Preliminar.pdf" },
                { id: "cp103_18", data: "2025-11-13", tipo: "FINAL", titulo: "Recurso ao Resultado Final Preliminar", comunicadoNum: "253/2025" },
                { id: "cp103_19", data: "2025-11-14", tipo: "FINAL", titulo: "Resultado Final Definitivo", comunicadoNum: "254/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP103.25-Resultado-Final-Definitivo.pdf" }
            ]
        },
        {
            id: "cp_113_2025",
            nome: "CHAMADA PÚBLICA Nº 113/2025",
            nomeCurto: "CP 113/2025",
            cssClass: "dot-cp-113",
            linkEdital: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/09/CP113.25-Edital.pdf",
            linkRecursoForm: "https://forms.gle/jm6sJ9u3fd4ECZWD8",
            proposito: "seleção de Coordenador(a) de Curso e Coordenador(a) de Tutoria para cursos da Universidade Aberta do Brasil (UAB) na Universidade Estadual do Ceará (UECE).",
            eventos: [
                { id: "cp113_1", data: "2025-09-29", tipo: "INSCRICAO", titulo: "Publicação do Edital", comunicadoNum: "243/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/09/CP113.25-Edital.pdf", linkForm: "https://forms.gle/jrtFRNUurMG2fVJ46" },
                { id: "cp113_2", data: "2025-10-15", tipo: "INSCRICAO", titulo: "Término das Inscrições", comunicadoNum: "243a/2025" },
                { id: "cp113_3", data: "2025-10-16", tipo: "INSCRICAO", titulo: "Resultado Preliminar das Inscrições", comunicadoNum: "244/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP113.25-Resultado_preliminar_inscricao.pdf" },
                { id: "cp113_4", data: "2025-10-17", tipo: "INSCRICAO", titulo: "Recurso ao Resultado Preliminar das Inscrições", comunicadoNum: "244a/2025" },
                { id: "cp113_5", data: "2025-10-20", tipo: "INSCRICAO", titulo: "Resultado Definitivo das Inscrições", comunicadoNum: "245/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP113.25-Resultado-definitivo-inscrição-.pdf" },
                { id: "cp113_6", data: "2025-10-21", tipo: "ANALISE_CURRICULO", titulo: "Início - Análise dos currículos" },
                { id: "cp113_7", data: "2025-10-23", tipo: "ANALISE_CURRICULO", titulo: "Término - Análise dos currículos" },
                { id: "cp113_8", data: "2025-10-24", tipo: "ANALISE_CURRICULO", titulo: "Resultado Preliminar da Análise de Currículo", comunicadoNum: "247/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP113.25-Resultado-Preliminar-Curriculo.pdf" },
                { id: "cp113_9", data: "2025-10-27", tipo: "ANALISE_CURRICULO", titulo: "Recurso ao Resultado Preliminar da Análise de Currículo", comunicadoNum: "248/2025" },
                { id: "cp113_10", data: "2025-10-28", tipo: "ANALISE_CURRICULO", titulo: "Resultado Definitivo da Análise de Currículo", comunicadoNum: "249/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP113.25-Resultado-Definitivo-Curriculo.pdf" },
                { id: "cp113_10a", data: "2025-10-28", tipo: "ENTREVISTA", titulo: "Convocação para Entrevistas", comunicadoNum: "250/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP113.25-Convocacao-Entrevistas_.pdf" },
                { id: "cp113_11", data: "2025-10-29", tipo: "ENTREVISTA", titulo: "Início - Entrevistas" },
                { id: "cp113_12", data: "2025-10-30", tipo: "ENTREVISTA", titulo: "Término - Entrevistas" },
                { id: "cp113_13", data: "2025-10-31", tipo: "ENTREVISTA", titulo: "Resultado Preliminar das Entrevistas", comunicadoNum: "252/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/10/CP113.25-Resultado-Preliminar-Entrevistas.pdf" },
                { id: "cp113_14", data: "2025-11-03", tipo: "ENTREVISTA", titulo: "Recurso ao Resultado Preliminar das Entrevistas", comunicadoNum: "252a/2025" },
                { id: "cp113_15", data: "2025-11-04", tipo: "ENTREVISTA", titulo: "Resultado Definitivo das Entrevistas", comunicadoNum: "253/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP113.25-Resultado-Definitivo-Enntrevistas.pdf" },
                { id: "cp113_16", data: "2025-11-07", tipo: "FINAL", titulo: "Resultado Final Preliminar", comunicadoNum: "254/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP113.25-Resultado-Final-Preliminar.pdf" },
                { id: "cp113_17", data: "2025-11-10", tipo: "FINAL", titulo: "Recurso ao Resultado Final Preliminar", comunicadoNum: "254a/2025" },
                { id: "cp113_18", data: "2025-11-11", tipo: "FINAL", titulo: "Resultado Final Definitivo", comunicadoNum: "255/2025", linkPDF: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP113.25-Resultado-Final-Definitivo.pdf" }
            ]
        },
        // --- NOVA CP 137/2025 ---
        {
            id: "cp_137_2025",
            nome: "CHAMADA PÚBLICA Nº 137/2025",
            nomeCurto: "CP 137/2025",
            cssClass: "dot-cp-137",
            linkEdital: "https://www.uece.br/sate/wp-content/uploads/sites/58/2025/11/CP139.25-Edital.pdf",
            linkRecursoForm: "https://forms.gle/bNbxdTg53ynoG2xK7",
            proposito: "seleção de ASSISTENTES PEDAGÓGICOS para atuar no Sistema UAB/UECE.",
            eventos: [
                { id: "cp137_1", data: "2025-12-01", tipo: "INSCRICAO", titulo: "Início - Período de Inscrição", linkForm: "https://forms.gle/bNbxdTg53ynoG2xK7" },
                { id: "cp137_2", data: "2025-12-15", tipo: "INSCRICAO", titulo: "Término - Período de Inscrição" },
                { id: "cp137_3", data: "2025-12-16", tipo: "INSCRICAO", titulo: "Resultado preliminar das inscrições" },
                { id: "cp137_4", data: "2025-12-17", tipo: "INSCRICAO", titulo: "Recurso ao indeferimento de inscrição" },
                { id: "cp137_5", data: "2025-12-18", tipo: "INSCRICAO", titulo: "Resultado final das inscrições" },
                
                { id: "cp137_6", data: "2025-12-19", tipo: "ANALISE_CURRICULO", titulo: "Início - Análise de currículos" },
                { id: "cp137_7", data: "2025-12-23", tipo: "ANALISE_CURRICULO", titulo: "Término - Análise de currículos" },
                { id: "cp137_8", data: "2026-01-05", tipo: "ANALISE_CURRICULO", titulo: "Resultado preliminar da análise de currículo" },
                { id: "cp137_9", data: "2026-01-06", tipo: "ANALISE_CURRICULO", titulo: "Recurso ao Resultado preliminar da análise de currículo" },
                { id: "cp137_10", data: "2026-01-07", tipo: "ANALISE_CURRICULO", titulo: "Resultado final da análise de currículo e convocação" },
                
                { id: "cp137_11", data: "2026-01-08", tipo: "ENTREVISTA", titulo: "Início - Realização das entrevistas" },
                { id: "cp137_12", data: "2026-01-13", tipo: "ENTREVISTA", titulo: "Término - Realização das entrevistas" },
                { id: "cp137_13", data: "2026-01-14", tipo: "ENTREVISTA", titulo: "Resultado preliminar das entrevistas" },
                { id: "cp137_14", data: "2026-01-15", tipo: "ENTREVISTA", titulo: "Recurso ao Resultado preliminar das entrevistas" },
                { id: "cp137_15", data: "2026-01-16", tipo: "ENTREVISTA", titulo: "Resultado final das entrevistas" },
                
                { id: "cp137_16", data: "2026-01-19", tipo: "FINAL", titulo: "Divulgação da Nota Final" },
                { id: "cp137_17", data: "2026-01-20", tipo: "FINAL", titulo: "Recurso ao Resultado da nota final" },
                { id: "cp137_18", data: "2026-01-22", tipo: "FINAL", titulo: "Publicação de Resultado Final Definitivo" },
                { id: "cp137_19", data: "2026-01-26", tipo: "DEFAULT", titulo: "Início do chamamento dos candidatos" }
            ]
        }
    ];

    // ============================================================================
    // 4. MÓDULO DE DADOS (PERSISTÊNCIA)
    // ============================================================================
    const DataModule = {
        KEY: 'calendario_publicacoes_db',
        init: () => {
            if (!localStorage.getItem(DataModule.KEY)) {
                localStorage.setItem(DataModule.KEY, JSON.stringify(defaultData));
            }
        },
        load: () => JSON.parse(localStorage.getItem(DataModule.KEY) || "[]"),
        save: (data) => {
            localStorage.setItem(DataModule.KEY, JSON.stringify(data));
            document.dispatchEvent(new CustomEvent('dataUpdated'));
        },
        reset: () => {
            if(confirm("ATENÇÃO: Isso apagará todas as alterações e restaurará os dados padrão (CP 103, 113 e 137). Continuar?")) {
                localStorage.setItem(DataModule.KEY, JSON.stringify(defaultData));
                document.dispatchEvent(new CustomEvent('dataUpdated'));
                alert("Dados restaurados.");
            }
        }
    };

    // ============================================================================
    // 5. MÓDULO DE UI CUSTOMIZADA (DROPDOWNS)
    // ============================================================================
    const CustomUI = {
        initDropdowns: () => {
            document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
                const select = wrapper.querySelector('.custom-select');
                const trigger = wrapper.querySelector('.custom-select-trigger');
                const options = wrapper.querySelectorAll('.custom-option');
                const hiddenSelect = wrapper.querySelector('select');

                const newTrigger = trigger.cloneNode(true);
                trigger.parentNode.replaceChild(newTrigger, trigger);
                
                newTrigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.custom-select').forEach(s => { 
                        if(s !== select) s.classList.remove('open'); 
                    });
                    select.classList.toggle('open');
                });

                const currentOptions = wrapper.querySelectorAll('.custom-option');
                currentOptions.forEach(option => {
                    const newOption = option.cloneNode(true);
                    option.parentNode.replaceChild(newOption, option);
                    
                    newOption.addEventListener('click', function(e) {
                        e.stopPropagation();
                        select.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');
                        select.querySelector('.custom-select-trigger span').textContent = this.textContent;
                        select.classList.remove('open');
                        hiddenSelect.value = this.getAttribute('data-value');
                        hiddenSelect.dispatchEvent(new Event('change'));
                    });
                });
            });
            window.addEventListener('click', () => document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('open')));
        },
        
        refreshChamadaDropdown: () => {
            const wrapper = document.getElementById('chamada-select-wrapper');
            const optionsContainer = wrapper.querySelector('.custom-options');
            const hiddenSelect = document.getElementById('chamada-select');
            const chamadasData = DataModule.load();
            const currentVal = hiddenSelect.value;

            optionsContainer.innerHTML = '<span class="custom-option selected" data-value="all">-- Todas as Chamadas --</span>';
            hiddenSelect.innerHTML = '<option value="all">-- Todas as Chamadas --</option>';
            
            let found = false;
            chamadasData.forEach(chamada => {
                const span = document.createElement('span');
                span.classList.add('custom-option');
                if(currentVal === chamada.id) { span.classList.add('selected'); found = true; }
                span.setAttribute('data-value', chamada.id);
                span.textContent = chamada.nome;
                optionsContainer.appendChild(span);

                const opt = document.createElement('option');
                opt.value = chamada.id;
                opt.textContent = chamada.nome;
                hiddenSelect.appendChild(opt);
            });
            
            const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
            if(currentVal !== 'all' && found) {
                const selected = chamadasData.find(c => c.id === currentVal);
                triggerSpan.textContent = selected ? selected.nome : '-- Todas as Chamadas --';
            } else {
                triggerSpan.textContent = '-- Todas as Chamadas --';
                const allOpt = optionsContainer.querySelector('[data-value="all"]');
                if(allOpt) allOpt.classList.add('selected');
            }
            CustomUI.initDropdowns();
        }
    };

    // ============================================================================
    // 6. ADMINISTRAÇÃO
    // ============================================================================
    const AdminModule = {
        currentChamadaId: null,
        init: () => {
            DOM.btnAdmin.addEventListener('click', AdminModule.openListModal);
            DOM.btnCloseList.forEach(btn => btn.addEventListener('click', () => DOM.modalList.style.display = 'none'));
            DOM.btnNewChamada.addEventListener('click', () => AdminModule.openChamadaForm());
            DOM.btnReset.addEventListener('click', DataModule.reset);
            DOM.btnCloseChamadaForm.forEach(btn => btn.addEventListener('click', () => DOM.modalChamadaForm.style.display = 'none'));
            DOM.formChamada.addEventListener('submit', AdminModule.saveChamada);
            DOM.btnCloseEvents.forEach(btn => btn.addEventListener('click', () => DOM.modalEvents.style.display = 'none'));
            DOM.btnNewEvent.addEventListener('click', () => AdminModule.openEventForm());
            DOM.btnCloseEventForm.forEach(btn => btn.addEventListener('click', () => DOM.modalEventForm.style.display = 'none'));
            DOM.formEvent.addEventListener('submit', AdminModule.saveEvent);
        },
        openListModal: () => { AdminModule.renderChamadaList(); DOM.modalList.style.display = 'flex'; },
        renderChamadaList: () => {
            const data = DataModule.load();
            DOM.adminList.innerHTML = '';
            data.forEach(chamada => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="admin-list-info">
                        <div class="admin-list-title">${chamada.nomeCurto}</div>
                        <div class="admin-list-subtitle">${chamada.nome}</div>
                    </div>
                    <div class="admin-list-actions">
                        <button class="action-btn btn-secondary btn-sm" onclick="AdminModule.openChamadaForm('${chamada.id}')"><i class="fa-solid fa-pen"></i> Editar</button>
                        <button class="action-btn btn-sm" onclick="AdminModule.openEventsManager('${chamada.id}')"><i class="fa-solid fa-list-check"></i> Eventos</button>
                        <button class="action-btn btn-danger btn-sm" onclick="AdminModule.deleteChamada('${chamada.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>`;
                DOM.adminList.appendChild(li);
            });
        },
        openChamadaForm: (id = null) => {
            DOM.formChamada.reset();
            document.getElementById('chamada-id').value = '';
            document.getElementById('chamada-form-title').textContent = id ? 'Editar Chamada' : 'Nova Chamada';
            if(id) {
                const data = DataModule.load();
                const c = data.find(x => x.id === id);
                if(c) {
                    document.getElementById('chamada-id').value = c.id;
                    document.getElementById('chamada-nome').value = c.nome;
                    document.getElementById('chamada-curto').value = c.nomeCurto;
                    document.getElementById('chamada-proposito').value = c.proposito || '';
                    document.getElementById('chamada-link-edital').value = c.linkEdital || '';
                    document.getElementById('chamada-link-recurso').value = c.linkRecursoForm || '';
                    document.getElementById('chamada-css').value = c.cssClass || 'dot-cp-default';
                }
            }
            DOM.modalChamadaForm.style.display = 'flex';
        },
        saveChamada: (e) => {
            e.preventDefault();
            const id = document.getElementById('chamada-id').value;
            const data = DataModule.load();
            const novo = {
                id: id || 'cp_' + Date.now(),
                nome: document.getElementById('chamada-nome').value,
                nomeCurto: document.getElementById('chamada-curto').value,
                proposito: document.getElementById('chamada-proposito').value,
                linkEdital: document.getElementById('chamada-link-edital').value,
                linkRecursoForm: document.getElementById('chamada-link-recurso').value,
                cssClass: document.getElementById('chamada-css').value,
                eventos: []
            };
            if(id) {
                const idx = data.findIndex(c => c.id === id);
                if(idx !== -1) { novo.eventos = data[idx].eventos; data[idx] = novo; }
            } else { data.push(novo); }
            DataModule.save(data);
            DOM.modalChamadaForm.style.display = 'none';
            AdminModule.renderChamadaList();
        },
        deleteChamada: (id) => {
            if(confirm("Apagar chamada e eventos?")) {
                const data = DataModule.load().filter(c => c.id !== id);
                DataModule.save(data);
                AdminModule.renderChamadaList();
            }
        },
        openEventsManager: (chamadaId) => {
            AdminModule.currentChamadaId = chamadaId;
            const c = DataModule.load().find(x => x.id === chamadaId);
            DOM.eventsTitle.textContent = c.nomeCurto;
            AdminModule.renderEventList();
            DOM.modalEvents.style.display = 'flex';
        },
        renderEventList: () => {
            const c = DataModule.load().find(x => x.id === AdminModule.currentChamadaId);
            DOM.eventsList.innerHTML = '';
            const sorted = [...c.eventos].sort((a, b) => new Date(a.data) - new Date(b.data));
            sorted.forEach(ev => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="admin-list-info"><div class="admin-list-title">${ev.titulo}</div><div class="admin-list-subtitle">${new Date(ev.data+'T00:00:00').toLocaleDateString('pt-br')} - ${ev.tipo}</div></div>
                    <div class="admin-list-actions"><button class="action-btn btn-secondary btn-sm" onclick="AdminModule.openEventForm('${ev.id}')"><i class="fa-solid fa-pen"></i></button><button class="action-btn btn-danger btn-sm" onclick="AdminModule.deleteEvent('${ev.id}')"><i class="fa-solid fa-trash"></i></button></div>`;
                DOM.eventsList.appendChild(li);
            });
        },
        openEventForm: (eid = null) => {
            DOM.formEvent.reset();
            document.getElementById('event-id').value = '';
            document.getElementById('event-form-title').textContent = eid ? 'Editar Evento' : 'Novo Evento';
            if(eid) {
                const c = DataModule.load().find(x => x.id === AdminModule.currentChamadaId);
                const ev = c.eventos.find(x => x.id === eid);
                if(ev) {
                    document.getElementById('event-id').value = ev.id;
                    document.getElementById('event-titulo').value = ev.titulo;
                    document.getElementById('event-data').value = ev.data;
                    document.getElementById('event-tipo').value = ev.tipo;
                    document.getElementById('event-comunicado').value = ev.comunicadoNum || '';
                    document.getElementById('event-link-pdf').value = ev.linkPDF || '';
                    document.getElementById('event-link-form').value = ev.linkForm || '';
                }
            }
            DOM.modalEventForm.style.display = 'flex';
        },
        saveEvent: (e) => {
            e.preventDefault();
            const eid = document.getElementById('event-id').value;
            const data = DataModule.load();
            const cIdx = data.findIndex(x => x.id === AdminModule.currentChamadaId);
            if(cIdx === -1) return;
            
            const newEv = {
                id: eid || 'evt_' + Date.now(),
                titulo: document.getElementById('event-titulo').value,
                data: document.getElementById('event-data').value,
                tipo: document.getElementById('event-tipo').value,
                comunicadoNum: document.getElementById('event-comunicado').value,
                linkPDF: document.getElementById('event-link-pdf').value,
                linkForm: document.getElementById('event-link-form').value
            };
            
            const events = data[cIdx].eventos;
            if(eid) {
                const evIdx = events.findIndex(x => x.id === eid);
                if(evIdx !== -1) events[evIdx] = newEv;
            } else { events.push(newEv); }
            
            DataModule.save(data);
            DOM.modalEventForm.style.display = 'none';
            AdminModule.renderEventList();
        },
        deleteEvent: (eid) => {
            if(confirm("Excluir evento?")) {
                const data = DataModule.load();
                const cIdx = data.findIndex(x => x.id === AdminModule.currentChamadaId);
                if(cIdx !== -1) {
                    data[cIdx].eventos = data[cIdx].eventos.filter(x => x.id !== eid);
                    DataModule.save(data);
                    AdminModule.renderEventList();
                }
            }
        }
    };

    // 7. LÓGICA DE EVENTOS E FILTROS
    const EventModule = {
        getFilteredEvents: (filterParams) => {
            let matches = [];
            const data = DataModule.load();
            const search = (AppState.selectedChamadaId === "all") ? data : data.filter(c => c.id === AppState.selectedChamadaId);
            
            search.forEach(c => {
                let evs = [];
                if(filterParams.year !== undefined) {
                    evs = c.eventos.filter(e => {
                        const d = new Date(e.data + 'T00:00:00');
                        return d.getFullYear() === filterParams.year && d.getMonth() === filterParams.month;
                    });
                } else if(filterParams.dateISO) {
                    evs = c.eventos.filter(e => e.data === filterParams.dateISO);
                }
                evs.forEach(e => matches.push({...e, chamadaId: c.id, chamadaNome: c.nome, nomeCurto: c.nomeCurto, cssClass: c.cssClass, proposito: c.proposito, linkRecursoForm: c.linkRecursoForm}));
            });
            
            if(AppState.selectedTipo !== "all") {
                matches = matches.filter(e => e.tipo === AppState.selectedTipo);
            }
            return matches;
        },
        getEventsForMonth: (year, month) => EventModule.getFilteredEvents({year, month}),
        displayEventsForDate: (dateISO) => {
            const d = new Date(dateISO + 'T00:00:00');
            DOM.selectedDateDisplay.textContent = d.toLocaleDateString('pt-br', {day:'2-digit', month:'long', year:'numeric'});
            DOM.eventList.innerHTML = '';
            const events = EventModule.getFilteredEvents({dateISO});
            
            if(events.length === 0) { DOM.eventList.innerHTML = '<li>Nenhum evento para este dia (com filtros atuais).</li>'; return; }
            
            events.sort((a,b) => a.titulo.localeCompare(b.titulo));
            events.forEach(e => {
                const li = document.createElement('li');
                const chName = (AppState.selectedChamadaId === "all") ? `<div class="event-chamada">${e.chamadaNome}</div>` : "";
                li.innerHTML = `${chName}<div class="event-title">${e.titulo}</div><div class="event-type">${e.tipo}</div><button class="action-btn generate-text-btn" data-eid="${e.id}" data-cid="${e.chamadaId}"><i class="fa-solid fa-file-lines"></i> Gerar Postagem</button>`;
                DOM.eventList.appendChild(li);
            });
        },
        clearDetails: () => { DOM.selectedDateDisplay.textContent = 'Selecione um dia'; DOM.eventList.innerHTML = ''; },
        checkTodayAlerts: () => {
            const today = Utils.formatDateISO(new Date());
            const evs = EventModule.getFilteredEvents({dateISO: today});
            DOM.notificationBell.style.display = (evs.length > 0) ? 'inline' : 'none';
        },
        openTextGenerator: (cid, eid) => {
            const c = DataModule.load().find(x => x.id === cid);
            const ev = c.eventos.find(x => x.id === eid);
            if(!c || !ev) return;
            DOM.modalEventTitle.textContent = `${c.nome} - ${ev.titulo}`;
            DOM.generatedText.value = EventModule.generateHTML(c, ev);
            DOM.modal.style.display = 'flex';
        },
        closeModal: () => { DOM.modal.style.display = 'none'; },
        generateHTML: (c, e) => {
            const { comunicadoNum, titulo, tipo, linkPDF, linkForm } = e;
            const { nome, proposito, linkRecursoForm } = c;
            const title = (comunicadoNum ? `COMUNICADO Nº ${comunicadoNum} – ` : '') + `${titulo} - ${nome.toUpperCase()}`;
            let body = "";
            
            // Helper de próxima data
            const findNext = () => {
                const idx = c.eventos.findIndex(x => x.id === e.id);
                const next = c.eventos.find((x, i) => i > idx && (x.tipo.includes('RECURSO') || x.titulo.toLowerCase().includes('recurso')));
                return next ? new Date(next.data+'T00:00:00').toLocaleDateString('pt-br', {day:'2-digit', month:'2-digit', year:'numeric'}) : "[DATA_DO_RECURSO]";
            };

            const tLower = titulo.toLowerCase();

            if (tLower.includes('resultado') || tLower.includes('convocação')) {
                if (tLower.includes('preliminar')) {
                    body = `
<p style="text-align: justify">Informamos no Anexo único o ${titulo.toLowerCase()} para a ${nome}, ${proposito}</p>
<p><strong>DOS RECURSOS:</strong><br />Os recursos serão feitos mediante ao envio do formulário <a href="${linkRecursoForm || '#'}">${linkRecursoForm || '#'}</a> no dia ${findNext()}.</p>
<h4><a href="${linkPDF || '#'}"><strong><span style="color: #0400ff">${titulo.toUpperCase()}</span></strong></a></h4>`;
                } else {
                    body = `
<p style="text-align: justify">Informamos no Anexo único o ${titulo.toLowerCase()} para a ${nome}, ${proposito}</p>
<h4><a href="${linkPDF || '#'}"><strong><span style="color: #0400ff">${titulo.toUpperCase()}</span></strong></a></h4>`;
                }
            }
            else if (tLower.includes('recurso') || tipo.includes('RECURSO')) {
                const dataHoje = new Date(e.data+'T00:00:00').toLocaleDateString('pt-br', {day:'2-digit', month:'2-digit', year:'numeric'});
                body = `
<p style="text-align: justify">Informamos que está aberto o período para ${titulo.toLowerCase()} referente à ${nome}.</p>
<p><strong>DOS RECURSOS:</strong><br />Os recursos serão feitos mediante ao envio do formulário <a href="${linkRecursoForm || '#'}">${linkRecursoForm || '#'}</a> no dia ${dataHoje}.</p>`;
            }
            else if (tLower.includes('início') || tLower.includes('publicação') || tLower.includes('abertura')) {
                if (tipo === 'INSCRICAO') {
                    body = `
<p style="text-align: justify">A coordenação da SATE/UAB/UECE publica o edital para a ${nome.toUpperCase()} de ${proposito}</p>
<p style="text-align: justify">A Secretaria de Apoio às Tecnologias Educacionais (SATE/UECE)... de acordo com as cláusulas do edital</p>
<h4><a href="${linkPDF || '#'}"><strong><span style="color: #0400ff">EDITAL</span></strong></a></h4>
<h4><a href="${linkForm || '#'}"><strong><span style="color: #0400ff">FORMULÁRIO DE INSCRIÇÃO</span></strong></a></h4>
<p><strong><span style="color: #ff0000">ATENÇÃO:</span></strong> Para evitar complicações durante o preenchimento...</p>`;
                } else {
                    body = `<p style="text-align: justify">Informamos o ${titulo.toLowerCase()} referente à ${nome}.</p>`;
                }
            }
            else if (tLower.includes('término') || tLower.includes('fim')) {
                body = `<p style="text-align: justify">Lembramos que hoje é o ${titulo.toLowerCase()} referente à ${nome}.</p>`;
            }
            else {
                body = `<p style="text-align: justify">${titulo} referente à ${nome}.</p>`;
            }

            const footer = `<hr /><h4><span style="color: #000000">Segue abaixo o link encaminhando para a página das Chamadas Públicas.</span></h4><h4><strong><span style="color: #0011ff"><a style="color: #0011ff" href="http://www.uece.br/sate/home/servicos-e-informativos/chamadas-publicas/chamadas-publicas-2025/">Chamadas Públicas - 2025</a></span></strong></h4>`;
            
            return `<h2>${title}</h2>\n${body}\n&nbsp;\n${footer}`;
        },
        copyText: async () => {
            DOM.generatedText.select();
            document.execCommand('copy');
            DOM.copyTextBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
            setTimeout(() => DOM.copyTextBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar Texto', 2000);
        }
    };

    // 8. RENDERIZADOR UI
    const Calendar = {
        render: (date) => {
            DOM.calendarGrid.innerHTML = '';
            DOM.currentMonthYear.textContent = date.toLocaleDateString('pt-br', {month:'long', year:'numeric'});
            const evs = EventModule.getFilteredEvents({year: date.getFullYear(), month: date.getMonth()});
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            const daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

            for(let i=0; i<firstDay; i++) {
                const d = document.createElement('div'); d.className = 'calendar-day other-month';
                DOM.calendarGrid.appendChild(d);
            }
            for(let i=1; i<=daysInMonth; i++) {
                const dISO = Utils.formatDateISO(new Date(date.getFullYear(), date.getMonth(), i));
                const d = document.createElement('div'); d.className = 'calendar-day';
                d.dataset.date = dISO;
                d.innerHTML = `<span class="day-number">${i}</span>`;
                if(Utils.isToday(date.getFullYear(), date.getMonth(), i)) d.classList.add('today');
                if(dISO === AppState.selectedDate) d.classList.add('selected');

                const dayEvs = evs.filter(e => e.data === dISO);
                if(dayEvs.length > 0) {
                    // Filtra recursos dos dots
                    const relevantEvs = dayEvs.filter(e => !e.titulo.toLowerCase().includes('recurso'));
                    if(relevantEvs.length > 0) {
                        const ul = document.createElement('ul'); ul.className = 'event-indicator';
                        const uniqueCPs = [...new Set(relevantEvs.map(e => e.chamadaId))];
                        uniqueCPs.forEach(cid => {
                            const c = DataModule.load().find(x => x.id === cid);
                            if(c) {
                                const li = document.createElement('li');
                                li.innerHTML = `<span class="event-dot ${c.cssClass||'dot-cp-default'}"></span><span class="cp-name-text">${c.nomeCurto}</span>`;
                                ul.appendChild(li);
                            }
                        });
                        d.appendChild(ul);
                    }
                }
                DOM.calendarGrid.appendChild(d);
            }
        },
        renderAgenda: () => {
            DOM.agendaView.innerHTML = '';
            const evs = EventModule.getFilteredEvents({year: AppState.currentDate.getFullYear(), month: AppState.currentDate.getMonth()});
            if(evs.length===0) { DOM.agendaView.innerHTML='<div style="padding:20px;text-align:center">Nada para este mês.</div>'; return; }
            
            evs.sort((a,b) => new Date(a.data)-new Date(b.data));
            const grouped = evs.reduce((acc, e) => { (acc[e.data]=acc[e.data]||[]).push(e); return acc; }, {});
            
            for(const dISO in grouped) {
                const dObj = new Date(dISO+'T00:00:00');
                const item = document.createElement('div'); item.className = 'agenda-item';
                let html = `<div class="agenda-date"><div class="day">${dObj.getDate()}</div><div class="weekday">${dObj.toLocaleDateString('pt-br',{weekday:'short'})}</div></div><div class="agenda-details">`;
                grouped[dISO].forEach(e => {
                    html += `<div class="agenda-chamada">${e.nomeCurto}</div><div class="agenda-title" onclick="document.dispatchEvent(new CustomEvent('agendaClick',{detail:'${dISO}'}))">${e.titulo}</div>`;
                });
                html += `</div>`;
                item.innerHTML = html;
                DOM.agendaView.appendChild(item);
            }
        }
    };

    // 9. INIT & HANDLERS
    function updateViews() {
        if(DOM.agendaView.style.display === 'none') Calendar.render(AppState.currentDate);
        else Calendar.renderAgenda();
        
        if(AppState.selectedDate) EventModule.displayEventsForDate(AppState.selectedDate);
        else EventModule.clearDetails();
        EventModule.checkTodayAlerts();
    }

    DOM.viewBtnMonth.addEventListener('click', () => {
        DOM.calendarGrid.style.display = 'grid'; DOM.calendarWeekdays.style.display = 'grid'; DOM.agendaView.style.display = 'none';
        DOM.viewBtnMonth.classList.add('active'); DOM.viewBtnAgenda.classList.remove('active');
        Calendar.render(AppState.currentDate);
    });
    DOM.viewBtnAgenda.addEventListener('click', () => {
        DOM.calendarGrid.style.display = 'none'; DOM.calendarWeekdays.style.display = 'none'; DOM.agendaView.style.display = 'block';
        DOM.viewBtnMonth.classList.remove('active'); DOM.viewBtnAgenda.classList.add('active');
        Calendar.renderAgenda();
    });
    DOM.prevMonthBtn.addEventListener('click', () => { AppState.currentDate.setMonth(AppState.currentDate.getMonth()-1); updateViews(); });
    DOM.nextMonthBtn.addEventListener('click', () => { AppState.currentDate.setMonth(AppState.currentDate.getMonth()+1); updateViews(); });
    
    DOM.calendarGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.calendar-day');
        if(!card || card.classList.contains('other-month')) return;
        const dISO = card.dataset.date;
        AppState.selectedDate = dISO;
        document.querySelectorAll('.calendar-day.selected').forEach(x => x.classList.remove('selected'));
        card.classList.add('selected');
        EventModule.displayEventsForDate(dISO);
    });

    document.addEventListener('agendaClick', (e) => {
        AppState.selectedDate = e.detail;
        EventModule.displayEventsForDate(e.detail);
    });

    DOM.eventList.addEventListener('click', (e) => {
        if(e.target.closest('.generate-text-btn')) {
            const btn = e.target.closest('.generate-text-btn');
            EventModule.openTextGenerator(btn.dataset.cid, btn.dataset.eid);
        }
    });

    DOM.modalCloseBtn.addEventListener('click', EventModule.closeModal);
    DOM.copyTextBtn.addEventListener('click', EventModule.copyText);
    
    DOM.chamadaSelect.addEventListener('change', (e) => { AppState.selectedChamadaId = e.target.value; updateViews(); });
    DOM.tipoSelect.addEventListener('change', (e) => { AppState.selectedTipo = e.target.value; updateViews(); });
    
    // Print Button Listener
    DOM.btnPrint.addEventListener('click', () => {
        window.print();
    });

    window.AdminModule = AdminModule;

    // START
    DataModule.init();
    AdminModule.init();
    CustomUI.refreshChamadaDropdown();
    CustomUI.initDropdowns();
    
    const today = Utils.formatDateISO(new Date());
    AppState.selectedDate = today;
    DOM.chamadaSelect.value = "all"; 
    DOM.tipoSelect.value = "all";
    
    Calendar.render(AppState.currentDate);
    EventModule.displayEventsForDate(today);
    EventModule.checkTodayAlerts();

    document.addEventListener('dataUpdated', () => {
        CustomUI.refreshChamadaDropdown();
        updateViews();
    });
});